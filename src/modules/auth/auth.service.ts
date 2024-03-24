import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const payload = await this.validateUser(loginUserDto.username, loginUserDto.password);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<Object> {
    const user = await this.userService.findOne(username);
    if (user.password === password) {
      const result = {
        sub: user.id,
        username: user.user_name,
      };
      return result;
    } else {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
  }
}