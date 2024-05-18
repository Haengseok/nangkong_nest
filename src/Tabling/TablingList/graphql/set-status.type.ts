import { Field, ID, InputType } from '@nestjs/graphql';
import { ListStatus } from './list-status.enum';

@InputType()
export class TablingSetStatusType {
  @Field(() => ID)
  id: number;

  @Field()
  tabling_type: ListStatus;
}
