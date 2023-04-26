import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

import { UserValidator } from "src/domains/users/user.validator";
import { UserRepository } from "src/domains/users/user.repository";
import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userValidator: UserValidator,
    ) {}

    async createUser(createUserLocalDto: CreateUserLocalDto) {
        const validation =
            this.userValidator.createUserValidator(createUserLocalDto);

        if (!validation)
            throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        validation.data.password = await bcrypt.hash(
            validation.data.password,
            10,
        );

        return await this.userRepository.createUser(validation);
    }

    async findUserByEmail(email: string) {
        const validation = this.userValidator.findUserValidator(email);

        if (!validation)
            throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        const result = await this.userRepository.findUserByEmail(validation);

        return result;
    }
}
