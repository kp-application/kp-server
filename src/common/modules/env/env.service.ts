import path from "path";
import fs from "fs";
import {Inject, Injectable} from "@nestjs/common";
import {ConfigType} from "@nestjs/config";
import {Algorithm} from "jsonwebtoken";

import envConfig from "src/common/config/env/env.config";
import * as process from "process";

@Injectable()
export class EnvService {
    getRedisEnv() {
        return "redis";
    }

    constructor(
        @Inject(envConfig.KEY)
        private readonly config: ConfigType<typeof envConfig>,
    ) {
        // const result = fs.readFileSync(
        //     path.resolve(process.env.PWD, "cloud.storage.json"),
        //     "utf8",
        // );
        //
        // process.env.GOOGLE_APPLICATION_CREDENTIALS = result;
    }

    getTokenSignatureMetaEnv() {
        const issuer = this.config.jwt.issuer;
        const expiresIn = this.config.jwt.expiresIn;
        const algorithm = this.config.jwt.algorithm as Algorithm;
        const privateKey = fs
            .readFileSync(path.join(process.cwd(), "openssl/private.pem"), "utf8")
            .toString();
        const publicKey = fs
            .readFileSync(path.join(process.cwd(), "openssl/private.pem"), "utf8")
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
