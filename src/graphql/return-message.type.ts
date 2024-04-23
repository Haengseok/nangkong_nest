import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReturnMessageType {
    @Field()
    message: string;
}