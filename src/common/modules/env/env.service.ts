import path from "path";
import fs from "fs";
import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Algorithm } from "jsonwebtoken";

import envConfig from "src/common/config/env/env.config";
import * as process from "process";

@Injectable()
export class EnvService {
    constructor(
        @Inject(envConfig.KEY)
        private readonly config: ConfigType<typeof envConfig>,
    ) {
        const result = fs.readFileSync(
            path.resolve(process.env.PWD, ""),
            "utf8",
        );

        process.env.GOOGLE_APPLICATION_CREDENTIALS = result;
    }

    getRedisEnv() {
        return "redis";
    }

    getTokenSignatureMetaEnv() {
        const issuer = this.config.jwt.issuer;
        const expiresIn = this.config.jwt.expiresIn;
        const algorithm = this.config.jwt.algorithm as Algorithm;
        const privateKey = fs
            .readFileSync(path.resolve(process.env.PWD, "openssl/private.pem"))
            .toString();
        const publicKey = fs
            .readFileSync(path.resolve(process.env.PWD, "openssl/public.pem"))
            .toString();
        const passphrase = this.config.jwt.passphrase;

        return {
            issuer,
            expiresIn,
            algorithm,
            privateKey: {
                key: privateKey,
                passphrase,
            },
            publicKey,
        };
    }

    getCloudStorageEnv() {}
}
