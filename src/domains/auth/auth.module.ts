import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "src/domains/auth/auth.controller";
import { AuthService } from "src/domains/auth/auth.service";
import { UserService } from "src/domains/users/user.service";
import { UserRepository } from "src/domains/users/user.repository";
import { UserValidator } from "src/domains/users/user.validator";
import { JwtStrategy } from "src/domains/auth/strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

import { privateKey, publicKey } from "src/main";

@Module({
    imports: [
        PassportModule.register({ session: false }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const options: JwtModuleOptions = {
                    publicKey,
                    privateKey,
                    signOptions: {
                        issuer: configService.get("JWT_ISSUER"),
                        algorithm: configService.get("JWT_ALGORITHM"),
                        expiresIn: configService.get("JWT_EXPIRESIN"),
                    },
                };

                return options;
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
    ],
    exports: [AuthService],
})
export class AuthModule {}
