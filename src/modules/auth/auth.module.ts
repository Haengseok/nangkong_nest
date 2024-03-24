import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { DtoService } from '../dto/dto.service';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.TOKENSECRETKEY || 'secert',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        DtoService,
        JwtStrategy, // 토큰check 로직
    ],
})
export class AuthModule { }
