import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const accessToken = this.jwtService.sign(payload);

    // TODO: 이전토큰 만료시키는 로직 필요
    
    // accessToken 생성
    const accessTokenModel = await this.accessTokenModel.create({
      client_id: payload.client_id,
      user_id: payload.sub,
      access_token: accessToken,
      scopes: '*',
    })

    // refreshToken 생성
    const refreshTokenModel = await this.refreshTokenModel.create({
      access_token_id: accessTokenModel.id,
      refresh_token: moment().format('YYYYMMDDHHmmss') + crypto.randomBytes(32).toString('hex'),
    })

    const authPayload: AuthPayload = {
      access_token: accessToken,
      refresh_token: refreshTokenModel.refresh_token,
    };

    return authPayload;
  }
}