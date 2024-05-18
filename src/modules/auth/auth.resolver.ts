import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginType } from './graphql/login.type';
import { AuthPayload } from './graphql/auth-payload.type';
import { RefreshLoginType } from './graphql/refresh-login.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 일반 로그인
  @Mutation(() => AuthPayload)
  async login(@Args('input') loginData: LoginType): Promise<AuthPayload> {
    const authPayload = await this.authService.login(loginData);
    return authPayload; // 생성된 Token을 반환합니다.
  }

  // Refresh 로그인
  @Mutation(() => AuthPayload)
  async refreshLogin(
    @Args('input') refreshLoginData: RefreshLoginType,
  ): Promise<AuthPayload> {
    const authPayload = await this.authService.refreshLogin(refreshLoginData);
    return authPayload;
  }

  // tabling 로그인
  @Mutation(() => AuthPayload)
  async tablingLogin(
    @Args('input') loginData: LoginType,
  ): Promise<AuthPayload> {
    const authPayload = await this.authService.tablingLogin(loginData);
    return authPayload; // 생성된 Token을 반환합니다.
  }
}
