import { Injectable } from "@nestjs/common";
import {Prisma, UserProfileMeta} from "@prisma/client";

import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";

@Injectable()
export class UserValidator {
    findUserValidator(email: string) {
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
        password
    }: CreateUserLocalDto) {
        return Prisma.validator<Prisma.UserCreateArgs>()({
            data: {
                email,
                name,
                password,
            },
            select: {
                userId: true,
                email: true,
                name: true,
            }
        });
    }

    createUserProfileValidator({
        age,
        gender,
        provider,
        phone,
   }: CreateUserLocalDto, userId: number) {
        return Prisma.validator<Prisma.UserProfileMetaCreateArgs>()({
            data: {
                age,
                gender,
                phone,
                userId,
            },
            select: {
                age: true,
                gender: true,
                phone: true,
            }
        })
    }
}
