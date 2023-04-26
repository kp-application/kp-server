import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { LoginUserDto } from "src/domains/users/dto/login-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            usernameField: "email",
            passwordField: "password",
        });
    }

    async validate({ email, password }: LoginUserDto) {}
}
