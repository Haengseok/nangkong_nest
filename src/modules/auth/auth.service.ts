import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { LoginType } from './graphql/login.type';
import { AuthPayload } from './graphql/auth-payload.type';
import { Client } from './model/client.model';
import * as moment from 'moment';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/sequelize';
import { AccessToken } from './model/access-token.model';
import { RefreshToken } from './model/refresh-token.model';
import { RefreshLoginType } from './graphql/refresh-login.type';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,

    @InjectModel(Client)
    private clientModel: typeof Client,

    @InjectModel(AccessToken)
    private accessTokenModel: typeof AccessToken,

    @InjectModel(RefreshToken)
    private refreshTokenModel: typeof RefreshToken,
  ) { }

  async login(loginData: LoginType): Promise<AuthPayload> {
    var payload = await this.validateUser(
      loginData.user_name,
      loginData.password,
    );

    // client 추가
    payload['client_id'] = await this.masterClientFindOrCreate('Master Client');

    return await this.generateAccessToken(payload);
  }

  async refreshLogin(refreshLoginData: RefreshLoginType): Promise<AuthPayload> {
    const refreshToken = await this.refreshTokenModel.findOne({
      where: { refresh_token: refreshLoginData.refresh_token },
      include: [AccessToken],
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (refreshToken.revoked) {
      throw new UnauthorizedException('Refresh Token is Expired');
    }

    const payload = {
      sub: refreshToken.access_token.user_id,
      client_id: refreshToken.access_token.client_id,
    }

    return await this.generateAccessToken(payload);
  }

  async validateUser(username: string, password: string): Promise<Object> {
    const user = await this.userService.findOne(username);
    if (await this.comparePasswords(password, user.password)) {
      const result = {
        sub: user.id,
        username: user.user_name,
      };
      return result;
    } else {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
  }

  // 비밀번호 check
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  // TODO: 추후 서비스따라 분리구현 필요
  // master client 체크 및 생성
  private async masterClientFindOrCreate(clientName: string): Promise<number> {
    var client = await this.clientModel.findOne({ where: { name: clientName } })
    // 없을 때 생성 후 ID return
    if (!client) {
      client = await this.clientModel.create({
        name: clientName,
        password_client: true,
        // 현재날자 + 랜덤 10자로 secret key 생성
        secret: moment().format('YYYYMMDDHHmmss') + crypto.randomBytes(10).toString('hex'),
      })
    }

    return client.id;
  }

  // accessToken 생성
  private async generateAccessToken(payload: any) {
    // accessToken 유효성 검사위한 키
    const secretKey = moment().format('YYYYMMDDHHmmss') + crypto.randomBytes(10).toString('hex');
    payload['secret'] = secretKey;

    const accessToken = this.jwtService.sign(payload);

    // 이전에 발급된 토큰 가져와서 만료시키기
    this.revokeToken(payload.client_id, payload.sub);

    // accessToken 생성
    const accessTokenModel = await this.accessTokenModel.create({
      client_id: payload.client_id,
      user_id: payload.sub,
      secret: secretKey,
      scopes: '*',
    });

    // refreshToken 생성
    const refreshTokenModel = await this.refreshTokenModel.create({
      access_token_id: accessTokenModel.id,
      refresh_token: moment().format('YYYYMMDDHHmmss') + crypto.randomBytes(32).toString('hex'),
      expired_at: moment().add(2, 'weeks').toDate(), // 2주
    });

    const authPayload: AuthPayload = {
      access_token: accessToken,
      refresh_token: refreshTokenModel.refresh_token,
    };

    return authPayload;
  }

  private async revokeToken(clientId: number, userId: number) {
    // 이전에 발급된 가져오기
    const beforeAccessToken = await this.accessTokenModel.findOne({
      where: {
        client_id: clientId,
        user_id: userId,
        revoked: false,
      },
      include: [RefreshToken],
    });

    // 있으면 만료
    if (beforeAccessToken) {
      // accessToken 만료
      beforeAccessToken.revoked = true;
      beforeAccessToken.save();

      // refreshToekn 만료
      beforeAccessToken.refresh_token.revoked = true;
      beforeAccessToken.refresh_token.save();
    }
  }

  // 외부에서 들어오는 token check
  public async apiTokenCheck(payload: any): Promise<boolean> {
    const accessToken = await this.accessTokenModel.findOne({
      where: {
        user_id: payload.sub,
        client_id: payload.client_id,
        secret: payload.secret,
      }
    });

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (accessToken.revoked) {
      throw new UnauthorizedException('Access Token is Expired');
    }

    return true;
  }
}