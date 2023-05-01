import { Controller, Inject } from "@nestjs/common";
import { TypedRoute, TypedBody, TypedParam, TypedQuery } from "@nestia/core";

import { AuthService } from "src/domains/auth/auth.service";

import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";
import { LoginUserDto } from "src/domains/users/dto/login-user.dto";
import { successResponseForm } from "src/common/interceptors/success.response";

@Controller({ path: "api/v1/auth", version: "1" })
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @TypedRoute.Post("signup")
    async createUser(@TypedBody() createUserLocalDto: CreateUserLocalDto) {
        const res = await this.authService.createUser(createUserLocalDto);

        const result =  successResponseForm(true, 201, res);

        return {
            result,
        }
    }

    @TypedRoute.Post("signin")
    async login(@TypedBody() loginUserDto: LoginUserDto) {
        const res = await this.authService.login(loginUserDto);
        return res;
    }
}
