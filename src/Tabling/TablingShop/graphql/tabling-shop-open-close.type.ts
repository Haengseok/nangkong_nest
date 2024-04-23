import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TablingShopOpenCloseType {
    @Field(() => ID, { nullable: true })
    id: number;

    @Field()
    shop_id: number;

    @Field()
    open_time: Date; // 수정일

    @Field({ nullable: true })
    close_time: Date; // 삭제일
}