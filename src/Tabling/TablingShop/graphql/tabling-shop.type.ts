import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TablingShopOpenCloseType } from "./tabling-shop-open-close.type";

@ObjectType()
export class TablingShopType {
    @Field(() => ID, { nullable: true })
    id: number; // 메장 아이디

    @Field()
    shop_name: string; // 매장 이름

    @Field()
    address: string; // 주소

    @Field({ nullable: true })
    detail_address: string; // 상세주소

    @Field({ nullable: true })
    phone_number: string; // 전화번호

    @Field(() => [TablingShopOpenCloseType], { nullable: true })
    open_close: TablingShopOpenCloseType;

    @Field()
    created_at: Date; // 생성일

    @Field()
    updated_at: Date; // 수정일

    @Field({ nullable: true })
    deleted_at: Date; // 삭제일
}