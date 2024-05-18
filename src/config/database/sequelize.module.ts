import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../modules/user/user.model'; // 생성한 모델 import
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([User])], // 생성한 모델 등록
})
export class SequelizeConfigModule {}
