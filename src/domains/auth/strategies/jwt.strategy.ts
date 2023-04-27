import { Injectable, Inject } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import envConfig from "src/common/config/env/env.config";
import { publicKey } from "src/main";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(envConfig.KEY)
        private readonly config: ConfigType<typeof envConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: publicKey,
            algorithms: config.jwt.algorithm,
        });
    }

    async validate(payload: any) {
        console.log(payload);
    }
}
