import { Controller, Get } from '@nestjs/common';
import { User } from './User.model';
import { UserService } from './User.service';
// import { UserService } from './user.service'; // UserService import
// import { User } from './user.model'; // User 모델 import

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers(); // UserService를 사용하여 모든 사용자 검색
  }
}