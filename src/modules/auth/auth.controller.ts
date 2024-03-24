import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { DtoService } from '../dto/dto.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly dtoService: DtoService,
  ) { }

  @Post('login')
  async login(@Body() LoginData: Object) {
    const loginUserDto: LoginUserDto = await this.dtoService.transform(LoginUserDto, LoginData);
    return this.authService.login(loginUserDto);
  }
}