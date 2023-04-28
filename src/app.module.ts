import path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "src/domains/auth/auth.module";
import { UserModule } from "src/domains/users/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { RedisModule } from "src/common/modules/redis/redis.module";
import envConfig from "src/common/config/env/env.config";
import { validationSchema } from "src/common/config/env/validator-schema";

@Module({
    imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(__dirname, ".env"),
            load: [envConfig],
            validationSchema,
        }),
    ],
})
export class AppModule {}
