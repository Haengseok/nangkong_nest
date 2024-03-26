import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { User } from './user.model';
import { DtoService } from '../dto/dto.service';
import { UserResolver } from './user.resolver';

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        DtoService,
        UserResolver,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule { }