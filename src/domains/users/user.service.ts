import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

import { UserValidator } from "src/domains/users/user.validator";
import { UserRepository } from "src/domains/users/user.repository";
import { PrismaService } from "src/common/modules/prisma/prisma.service";
import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userValidator: UserValidator,
        private readonly prisma: PrismaService,
    ) {}

    async createUser(createUserLocalDto: CreateUserLocalDto) {
        const userInputValidation = this.userValidator.createUserValidator(createUserLocalDto);

        userInputValidation.data.password = await bcrypt.hash(
            userInputValidation.data.password,
            12,
        );

        const result = await this.userRepository.createUser(userInputValidation);
    }

    async findUserByEmail(email: string) {
        const validation = this.userValidator.findUserValidator(email);

        if (!validation) throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        const result = await this.userRepository.findUserByEmail(validation);

        return result;
    }

    async updateUserImage() {
        return await this.prisma.rawQuery();
    }
}
