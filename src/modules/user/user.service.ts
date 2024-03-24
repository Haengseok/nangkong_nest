import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UniqueConstraintError } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User, // 사용자 모델 주입
  ) { }

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

  async findOne(username: string): Promise<User> {
    const user = this.userModel.findOne({ where: { user_name: username } });
    if (user !== null) {
      return user;
    } else {
      throw new HttpException('Not found User!', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      // 고유 제약 조건 위반 오류 처리
      if (error instanceof UniqueConstraintError) {
        throw new HttpException('Name or email already exists.', HttpStatus.CONFLICT);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  }
}