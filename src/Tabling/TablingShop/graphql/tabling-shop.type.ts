import { Field, ID, ObjectType } from "@nestjs/graphql";

// GraphQL 스키마에 사용될 유저 타입을 정의합니다.
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

    @Field()
    created_at: Date; // 생성일

    @Field()
    updated_at: Date; // 수정일

    @Field({ nullable: true })
    deleted_at: Date; // 삭제일
}