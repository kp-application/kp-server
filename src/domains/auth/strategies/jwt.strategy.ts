import { Injectable, Inject } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { EnvService } from "src/common/modules/env/env.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly envService: EnvService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: envService.getTokenSignatureMetaEnv().publicKey,
            algorithms: envService.getTokenSignatureMetaEnv().algorithm,
        });
    }

    async validate(payload: any) {
        console.log(payload);
    }
}
