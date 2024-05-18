import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/modules/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { TablingListType } from './graphql/list.type';
import { TablingListService } from './tabling-list.service';
import { TablingCreateListType } from './graphql/create-list.type';
import { TablingListInputType } from './graphql/list-input.type';
import { ReturnMessageType } from 'src/graphql/return-message.type';
import { TablingCallListType } from './graphql/call-list.type';
import { TablingSetStatusType } from './graphql/set-status.type';

@UseGuards(GqlAuthGuard)
@Resolver(() => TablingListType)
export class TablingListResolver {
  constructor(private service: TablingListService) {}

  @Query(() => [TablingListType])
  async watingList(
    @Args('input') condition: TablingListInputType,
  ): Promise<TablingListType[]> {
    return await this.service.getWaitList(condition);
  }

  @Mutation(() => TablingListType)
  async tablingCreateList(
    @Args('input') createData: TablingCreateListType,
  ): Promise<TablingListType> {
    const createdShop = await this.service.create(createData);
    return createdShop; // 생성된 유저를 반환합니다.
  }

  @Mutation(() => ReturnMessageType)
  async callWatingCustomer(
    @Args('input') data: TablingCallListType,
  ): Promise<ReturnMessageType> {
    // TODO: 추후 알림톡|메시지 전송 로직 구현
    return { message: 'success' };
  }

  @Mutation(() => TablingListType)
  async setTablingStatus(
    @Args('input') data: TablingSetStatusType,
  ): Promise<TablingListType> {
    return await this.service.setStatus(data);
  }
}
