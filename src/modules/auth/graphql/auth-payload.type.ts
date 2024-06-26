import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
