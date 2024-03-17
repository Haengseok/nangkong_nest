import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './User.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User, // 사용자 모델 주입
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      // 모든 사용자 검색
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      // 오류 처리
      throw new Error('Failed to fetch users');
    }
  }
}