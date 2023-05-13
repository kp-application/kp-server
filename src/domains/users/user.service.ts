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
        const userValidator =
            this.userValidator.createUserValidator(createUserLocalDto);

        if (!userValidator)
            throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        userValidator.data.password = await bcrypt.hash(
            userValidator.data.password,
            10,
        );

        const createUser = await this.userRepository.createUser(userValidator);

        const profileValidator = this.userValidator.createUserProfileValidator(
            createUserLocalDto,
            createUser.userId,
        );

        if (!profileValidator)
            throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        const createProfile = await this.userRepository.createUserProfile(
            profileValidator,
        );

        return {
            user: createUser,
            profile: createProfile,
        };
    }

    async findUserByEmail(email: string) {
        const validation = this.userValidator.findUserValidator(email);

        if (!validation)
            throw new BadRequestException("요청 형식이 적합하지 않습니다.");

        const result = await this.userRepository.findUserByEmail(validation);

        return result;
    }

    async updateUserImage(updateUserImageDto: Express.Multer.File) {}
}
