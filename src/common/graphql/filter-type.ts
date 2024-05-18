import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterInput {
  @Field()
  field: string;

  @Field()
  operator: string;

  @Field()
  value: string;
}
