import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { TablingUser } from './tabling-user.model';
import { TablingUserService } from './tabling-user.service';
import { TablingUserResolver } from './tabling-user.resolver';

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([TablingUser]),
    ],
    providers: [
        TablingUserService,
        TablingUserResolver,
    ],
    exports: [
        // UserService,
    ],
})
export class TablingUserModule { }