import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TablingUserType } from './graphql/tabling-user.type';
import { TablingUserService } from './tabling-user.service';
import { TablingCreateUser } from './graphql/tabling-create-user.type';

@Resolver(() => TablingUserType)
export class TablingUserResolver {
    constructor(
        private readonly userService: TablingUserService,
    ) { }

    @Mutation(() => TablingUserType)
    async tablingCreateUser(@Args('input') createData: TablingCreateUser): Promise<TablingUserType> {
        const createdUser = await this.userService.create(createData);
        return createdUser; // 생성된 유저를 반환합니다.
    }
}