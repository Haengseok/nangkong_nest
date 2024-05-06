import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ListStatus } from "./list-status.enum";

@ObjectType()
export class TablingListType {
    @Field(() => ID)
    id: number;

    @Field()
    shop_id: number;

    @Field({ nullable: true })
    phone_number: string; // 전화번호

    @Field()
    tabling_type: ListStatus;

    @Field()
    personnel: number;

    @Field()
    created_at: Date; // 생성일

    @Field({ nullable: true })
    updated_at: Date; // 수정일

    @Field({ nullable: true })
    deleted_at: Date; // 삭제일
}