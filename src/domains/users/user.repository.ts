import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/common/modules/prisma/prisma.service";
import { UserValidator } from "src/domains/users/user.validator";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findUserByEmail(email: ReturnType<UserValidator["findUserValidator"]>) {
        return this.prisma.user.findUnique(email);
    }

    async createUser(userCreateInput: ReturnType<UserValidator["createUserValidator"]>) {
        // : ReturnType<UserValidator["createUserValidator"]>
        return this.prisma.user.create(userCreateInput);
    }

    async createUserProfile(
        userProfileInput: ReturnType<UserValidator["createUserProfileValidator"]>,
    ) {
        return this.prisma.userProfileMeta.create(userProfileInput);
    }
}
