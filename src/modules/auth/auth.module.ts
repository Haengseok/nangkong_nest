import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { DtoService } from '../dto/dto.service';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
import { AuthResolver } from './auth.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { Client } from './model/client.model';
import { AccessToken } from './model/access-token.model';
import { RefreshToken } from './model/refresh-token.model';
dotenv.config();

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([
            Client,
            AccessToken,
            RefreshToken,
        ]),
        
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
        AuthResolver,
    ],
})
export class AuthModule { }
