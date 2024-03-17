import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GraphQLModule } from '@nestjs/graphql';
import { UserController } from './modules/User/User.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config/database/database.config';
import { SequelizeConfigModule } from './config/database/sequelize.module';
import { UserService } from './modules/User/User.service';
import { User } from './modules/User/User.model';

@Module({
  imports: [
    SequelizeModule.forRoot(config),
    SequelizeModule.forFeature([User]),
    // SequelizeConfigModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    // }),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
  ],
})
export class AppModule {}