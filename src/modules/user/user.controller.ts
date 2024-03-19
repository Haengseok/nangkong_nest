import { Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
// import { UserService } from './user.service'; // UserService import
// import { User } from './user.model'; // User 모델 import

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  async findAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers(); // UserService를 사용하여 모든 사용자 검색
  }

  // @Post('register')
  // async registerUser(@Body() userData: CreateUserDto): Promise<User> {
  //   // 새로운 사용자 데이터를 처리하고 사용자를 등록하는 코드 작성
  // }
}