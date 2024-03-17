import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

// sequelize.config.ts
import { SequelizeModuleOptions } from '@nestjs/sequelize';

const config: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'my_database',
  autoLoadModels: true,
  synchronize: false,
};

export default config;

// const sequelize = new Sequelize(
//   (process.env.DB_DATABASE || 'mydatabase'),
//   (process.env.DB_USERNAME || 'root'),
//   (process.env.DB_PASSWORD || ''),
//   {
//     host: (process.env.DB_HOST || 'localhost'),
//     port: parseInt(process.env.DB_PASSWORD || '3306'),
//     dialect: 'mysql',
//     timezone: 'Asia/Seoul', // 서울 시간대로 설정
//   });

// export default sequelize;