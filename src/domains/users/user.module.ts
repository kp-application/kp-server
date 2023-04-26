import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "src/domains/users/user.controller";
import { UserService } from "src/domains/users/user.service";
import { UserRepository } from "src/domains/users/user.repository";
import { UserValidator } from "src/domains/users/user.validator";

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, UserValidator, PrismaService],
})
export class UserModule {}
