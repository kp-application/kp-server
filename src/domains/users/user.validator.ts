import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";

@Injectable()
export class UserValidator {
    findUserValidator(email) {
        return Prisma.validator<Prisma.UserFindFirstArgs>()({
            where: {
                email,
            },
            select: {
                email: true,
                name: true,
                password: true,
            },
        });
    }

    createUserValidator({
        email,
        name,
        password,
        age,
        gender,
    }: CreateUserLocalDto) {
        return Prisma.validator<Prisma.UserCreateArgs>()({
            data: {
                email,
                name,
                password,
            },
        });
    }
}
