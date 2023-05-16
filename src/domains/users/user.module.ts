import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "src/common/modules/prisma/prisma.service";
import { UserController } from "src/domains/users/user.controller";
import { UserService } from "src/domains/users/user.service";
import { UserRepository } from "src/domains/users/user.repository";
import { UserValidator } from "src/domains/users/user.validator";
import { EnvService } from "src/common/modules/env/env.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserValidator, PrismaService, EnvService, JwtService],
})
export class UserModule {}
