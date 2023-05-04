import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "src/domains/auth/auth.controller";
import { AuthService } from "src/domains/auth/auth.service";
import { UserService } from "src/domains/users/user.service";
import { UserRepository } from "src/domains/users/user.repository";
import { UserValidator } from "src/domains/users/user.validator";
import { JwtStrategy } from "src/domains/auth/strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { EnvModule } from "src/common/modules/env/env.module";
import { EnvService } from "src/common/modules/env/env.service";

@Module({
    imports: [
        PassportModule.register({ session: false }),
        JwtModule.registerAsync({
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService): JwtModuleOptions => {
                const { issuer, expiresIn, algorithm, privateKey, publicKey } =
                    envService.getTokenSignatureMetaEnv();

                return {
                    privateKey,
                    publicKey,
                    signOptions: {
                        issuer,
                        algorithm,
                        expiresIn,
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        PrismaService,
        AuthService,
        UserService,
        UserValidator,
        UserRepository,
        JwtStrategy,
        LocalStrategy,
        EnvService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
