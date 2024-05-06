import { Field, InputType } from "@nestjs/graphql";
import { ListStatus } from "./list-status.enum";

@InputType()
export class TablingCreateListType {
    @Field()
    shop_id: number;

    @Field()
    phone_number: string; // 전화번호

    @Field()
    tabling_type: ListStatus;

    @Field()
    personnel: number;
}