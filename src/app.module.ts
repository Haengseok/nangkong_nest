import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GraphQLModule } from '@nestjs/graphql';
import { UserController } from './modules/user/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config/database/database.config';
import { SequelizeConfigModule } from './config/database/sequelize.module';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/user.model';
import { DtoService } from './modules/dto/dto.service';

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
    DtoService,
  ],
})
export class AppModule {}