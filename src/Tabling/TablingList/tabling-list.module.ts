import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import config from 'src/config/database/database.config';
import { TablingListService } from './tabling-list.service';
import { TablingListResolver } from './tabling-list.resolver';
import { TablingList } from './model/tabling-list.model';
import { TablingShopModule } from '../TablingShop/tabling-shop.module';

@Module({
  imports: [
    SequelizeModule.forRoot(config),
    SequelizeModule.forFeature([TablingList]),

    TablingShopModule, // 추후 shop 에서 list 모듈이 필요할경우 상위 모듈생성 필요.
  ],
  providers: [TablingListService, TablingListResolver],
})
export class TablingListModule {}
