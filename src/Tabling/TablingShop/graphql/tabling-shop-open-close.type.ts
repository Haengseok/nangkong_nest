import { Field, ID, ObjectType } from "@nestjs/graphql";

// GraphQL 스키마에 사용될 유저 타입을 정의합니다.
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