import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { TablingShop } from './tabling-shop.model';
import { TablingShopService } from './tabling-shop.service';
import { TablingShopResolver } from './tabling-shop.resolver';

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([TablingShop]),
    ],
    providers: [
        TablingShopService,
        TablingShopResolver,
    ],
    // exports: [
    //     TablingUserService
    // ],
})
export class TablingShopModule { }