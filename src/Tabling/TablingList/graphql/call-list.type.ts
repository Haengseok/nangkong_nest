import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TablingCallListType {
  @Field()
  id: number;
}
