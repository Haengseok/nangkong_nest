import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class TablingCreateShop {
    @Field()
    shop_name: string;

    @Field()
    address: string;

    @Field()
    detail_address: string;

    @Field()
    phone_number: string;
}