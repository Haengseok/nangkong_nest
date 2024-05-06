import { Field, ID, InputType } from "@nestjs/graphql";
import { ListStatus } from "./list-status.enum";

@InputType()
export class TablingListInputType {
    @Field(() => ID, { nullable: true })
    id: number;

    @Field({ nullable: true })
    shop_id: number;

    @Field({ nullable: true })
    phone_number: string; // 전화번호

    @Field({ nullable: true })
    tabling_type: ListStatus;

    @Field({ nullable: true })
    personnel: number;

    @Field({ nullable: true })
    created_at: Date; // 생성일

    @Field({ nullable: true })
    updated_at: Date; // 수정일

    @Field({ nullable: true })
    deleted_at: Date; // 삭제일
}