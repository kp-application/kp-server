import { Request } from "express";
import { Observable } from "rxjs";
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { EnvService } from "src/common/modules/env/env.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly envService: EnvService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.#extractTokenFromHeader(request);

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                publicKey: this.envService.getTokenSignatureMetaEnv().publicKey,
            });

            request["user"] = payload;
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    #extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers?.authorization.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
