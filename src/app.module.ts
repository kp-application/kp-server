import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "src/domains/auth/auth.module";
import { UserModule } from "src/domains/users/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
