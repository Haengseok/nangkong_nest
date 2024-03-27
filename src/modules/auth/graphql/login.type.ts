import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType() // @InputType() 데코레이터 추가
export class LoginType {
    @Field()
    user_name: string; // 유저 이름

    @Field()
    @MinLength(6)
    password: string;
}