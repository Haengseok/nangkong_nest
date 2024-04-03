import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.TOKENSECRETKEY || 'secert',
        });
    }

    async validate(payload: any) {
        // accessToken 유효성 check
        await this.authService.apiTokenCheck(payload);
        
        return { userId: payload.sub, username: payload.username };
    }
}