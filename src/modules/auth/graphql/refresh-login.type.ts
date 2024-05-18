import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RefreshLoginType {
  @Field()
  refresh_token: string; // refresh token
}
