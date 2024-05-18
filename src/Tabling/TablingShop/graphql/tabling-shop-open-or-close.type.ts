import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum ShopStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

registerEnumType(ShopStatus, {
  name: 'ShopStatus',
});

@InputType()
export class TablingShopOpenOrCloseType {
  @Field((type) => ShopStatus)
  status: ShopStatus;

  @Field()
  shop_id: number;
}
