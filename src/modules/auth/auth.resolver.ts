import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginType } from "./graphql/login.type";
import { AuthPayload } from "./graphql/auth-payload.type";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Mutation(() => AuthPayload)
    async login(@Args('input') loginData: LoginType): Promise<AuthPayload> {
        const createdUser = await this.authService.login(loginData);
        return createdUser; // 생성된 유저를 반환합니다.
    }
}