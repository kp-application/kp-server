import path from "path";
import fs from "fs";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Algorithm } from "jsonwebtoken";

import envConfig from "src/common/config/env/env.config";

@Injectable()
export class EnvService {
    constructor(
        @Inject(envConfig.KEY)
        private readonly config: ConfigType<typeof envConfig>,
    ) {
        const result = fs.readFileSync(
            path.resolve(process.cwd(), config.cloudStorage.keyFilename),
            "utf8",
        );

        process.env.GOOGLE_APPLICATION_CREDENTIALS = result;
    }

    getTokenSignatureMetaEnv() {
        const issuer = this.config.jwt.issuer;
        const expiresIn = this.config.jwt.expiresIn;
        const algorithm = this.config.jwt.algorithm as Algorithm;
        const privateKey = fs
            .readFileSync(path.join(process.cwd(), this.config.openSsl.privateKeyDir), "utf8")
            .toString();
        const publicKey = fs
            .readFileSync(path.join(process.cwd(), this.config.openSsl.publicDir), "utf8")
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

    getNodeEnv() {
        return this.config.nodeEnv;
    }

    getCloudStorageMetaEnv() {
        const acl = this.config.cloudStorage.acl;
        const bucket = this.config.cloudStorage.bucket;
        const projectId = this.config.cloudStorage.projectId;
        const keyFilename = this.config.cloudStorage.keyFilename;

        return {
            acl,
            bucket,
            projectId,
            keyFilename,
        };
    }

    getRedisMetaEnv() {
        return {
            host: this.config.redis.host,
            port: this.config.redis.port,
            password: this.config.redis.password,
        };
    }
}
