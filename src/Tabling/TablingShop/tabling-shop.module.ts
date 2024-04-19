import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { TablingShop } from './model/tabling-shop.model';
import { TablingShopService } from './tabling-shop.service';
import { TablingShopResolver } from './tabling-shop.resolver';
import { TablingShopOpenClose } from './model/tabling-shop-open-close.module';

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([
            TablingShop,
            TablingShopOpenClose,
        ]),
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