import { Resolver, Query } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';

@Resolver(() => UserType)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(() => [UserType])
    async users(): Promise<UserType[]> {
        return this.userService.getAllUsers();
    }
}