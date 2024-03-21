import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { DtoService } from '../dto/dto.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dtoService: DtoService,
  ) { }

  @Get('all')
  async findAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers(); // UserService를 사용하여 모든 사용자 검색
  }

  @Post()
  async createUser(@Body() userData: any): Promise<User> {
    // DTO 변환
    const createUserDto: CreateUserDto = await this.dtoService.transform(CreateUserDto, userData);

    // service create 호출
    const createdUser: User = await this.userService.create(createUserDto);
    return createdUser;
  }
}