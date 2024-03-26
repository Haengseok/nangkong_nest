import { Field, ID, ObjectType } from "@nestjs/graphql";

// GraphQL 스키마에 사용될 유저 타입을 정의합니다.
@ObjectType()
export class UserType {
    @Field(() => ID, { nullable: true })
    id: number; // 유저 아이디

    @Field()
    user_name: string; // 유저 이름

    @Field()
    email: string; // 이메일

    @Field({ nullable: true })
    phone_number: string; // 전화번호

    @Field()
    password: string; // 비밀번호

    @Field()
    created_at: Date; // 생성일

    @Field()
    updated_at: Date; // 수정일

    @Field({ nullable: true })
    deleted_at: Date; // 삭제일
}