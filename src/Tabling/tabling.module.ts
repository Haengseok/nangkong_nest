import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { TablingUserModule } from './TablingUser/tabling-user.module';
import { TablingShopModule } from './TablingShop/tabling-shop.module';
dotenv.config();

@Module({
  imports: [
    TablingUserModule,
    TablingShopModule,
  ],
//   providers: [],
})
export class TablingModule { }