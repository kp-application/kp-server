import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRedis } from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";

import { UserService } from "src/domains/users/user.service";
import { UserValidator } from "src/domains/users/user.validator";
import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";
import { LoginUserDto } from "src/domains/users/dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userValidator: UserValidator,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRedis() private readonly redis: Redis,
    ) {}

    async validateUser(loginUserDto: LoginUserDto) {
        const existUser = await this.userService.findUserByEmail(loginUserDto.email);

        if (!existUser) throw new ConflictException("존재하지 않는 사용자입니다.");

        const comparePassword = await bcrypt.compare(loginUserDto.password, existUser.password);

        if (!comparePassword) throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");

        return existUser;
    }

    async createUser(createUserLocalDto: CreateUserLocalDto) {
        const existUser = await this.userService.findUserByEmail(createUserLocalDto.email);

        if (existUser) throw new ConflictException("이미 존재하는 이메일입니다.");

        await this.userService.createUser(createUserLocalDto);
    }

    async login(loginUserDto: LoginUserDto) {
        const { name, email } = await this.validateUser(loginUserDto);

        const payload = { name, email };
        const token = await this.jwtService.signAsync(payload);

        return token;
    }
}
