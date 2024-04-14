import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TablingShopType } from './graphql/tabling-shop.type';
import { TablingShopService } from './tabling-shop.service';
import { TablingCreateShop } from './graphql/tabling-create-shop.type';

@Resolver(() => TablingShopType)
export class TablingShopResolver {
    constructor(
        private readonly shopService: TablingShopService,
    ) { }
    
    @Query(() => TablingShopType)
    // @UseGuards(GqlAuthGuard)
    async tablingShopFindName(@Args('shop_name') name: string): Promise<TablingShopType> {
        return await this.shopService.findOne(name);
    }

    @Mutation(() => TablingShopType)
    async tablingCreateShop(@Args('input') createData: TablingCreateShop): Promise<TablingShopType> {
        const createdUser = await this.shopService.create(createData);
        return createdUser; // 생성된 유저를 반환합니다.
    }
}