import path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "@liaoliaots/nestjs-redis";

import { AuthModule } from "src/domains/auth/auth.module";
import { UserModule } from "src/domains/users/user.module";
import { PrismaModule } from "src/common/modules/prisma/prisma.module";
import { EnvModule } from "src/common/modules/env/env.module";
import { EnvService } from "src/common/modules/env/env.service";
import envConfig from "src/common/config/env/env.config";
import { validationSchema } from "src/common/config/env/validator-schema";

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, ".env"),
            load: [envConfig],
            validationSchema,
        }),
        PrismaModule,
        RedisModule.forRootAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: async (envService: EnvService) => {
                const { host, port, password } = envService.getRedisMetaEnv();
                return {
                    readyLog: true,
                    config: {
                        host,
                        port,
                        // password,
                    },
                };
            },
        }),
    ],
})
export class AppModule {}
