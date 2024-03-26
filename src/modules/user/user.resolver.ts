import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './graphql/user.type';
import { UserService } from './user.service';
import { DtoService } from '../dto/dto.service';
import { CreateUser } from './graphql/create-user.type';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserType)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly dtoService: DtoService,
    ) { }

    // 전체 user 조회
    @Query(() => [UserType])
    @UseGuards(GqlAuthGuard)
    async users(): Promise<UserType[]> {
        return this.userService.getAllUsers();
    }

    @Mutation(() => UserType)
    async createUser(@Args('input') createData: CreateUser): Promise<UserType> {
        const createdUser = await this.userService.create(createData);
        return createdUser; // 생성된 유저를 반환합니다.
    }
}