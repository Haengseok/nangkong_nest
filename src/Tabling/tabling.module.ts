import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { TablingUserModule } from './TablingUser/tabling-user.module';
dotenv.config();

@Module({
  imports: [
    TablingUserModule,
  ],
//   providers: [],
})
export class TablingModule { }