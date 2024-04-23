import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TablingShopType } from './graphql/tabling-shop.type';
import { TablingShopService } from './tabling-shop.service';
import { TablingCreateShop } from './graphql/tabling-create-shop.type';
import { TablingShopOpenOrCloseType } from './graphql/tabling-shop-open-or-close.type';
import { ReturnMessageType } from 'src/graphql/return-message.type';
import { GqlAuthGuard } from 'src/modules/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => TablingShopType)
export class TablingShopResolver {
    constructor(
        private readonly shopService: TablingShopService,
    ) { }
    
    @Query(() => TablingShopType)
    @UseGuards(GqlAuthGuard)
    async tablingShopFindName(@Args('shop_name') name: string): Promise<TablingShopType> {
        return await this.shopService.findOne(name);
    }

    @Mutation(() => TablingShopType)
    async tablingCreateShop(@Args('input') createData: TablingCreateShop): Promise<TablingShopType> {
        const createdShop = await this.shopService.create(createData);
        return createdShop; // 생성된 유저를 반환합니다.
    }

    @Mutation(() => ReturnMessageType)
    @UseGuards(GqlAuthGuard)
    async tablingShopOpenOrClose(@Args('input') data: TablingShopOpenOrCloseType): Promise<ReturnMessageType> {
        const message = await this.shopService.openOrClose(data);
        return message;
    }
}