import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class TablingCreateUser {
  @Field()
  user_name: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  @MinLength(6)
  password: string;
}
