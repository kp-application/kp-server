import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "src/domains/users/user.service";
import { UserValidator } from "src/domains/users/user.validator";
import { CreateUserLocalDto } from "src/domains/users/dto/create-user-local.dto";
import { LoginUserDto } from "src/domains/users/dto/login-user.dto";
import { RedisCacheService } from "src/common/modules/redis/redis.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userValidator: UserValidator,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisCacheService: RedisCacheService,
    ) {}

    async validateUser(loginUserDto: LoginUserDto) {
        const existUser = await this.userService.findUserByEmail(
            loginUserDto.email,
        );

        if (!existUser)
            throw new ConflictException("존재하지 않는 사용자입니다.");

        const comparePassword = await bcrypt.compare(
            loginUserDto.password,
            existUser.password,
        );

        if (!comparePassword)
            throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");

        return existUser;
    }

    async createUser(createUserLocalDto: CreateUserLocalDto) {
        const existUser = await this.userService.findUserByEmail(
            createUserLocalDto.email,
        );

        if (existUser)
            throw new ConflictException("이미 존재하는 이메일입니다.");

        const { password, ...user } = await this.userService.createUser(
            createUserLocalDto,
        );

        return user;
    }

    async login(loginUserDto: LoginUserDto) {
        const validation = await this.validateUser(loginUserDto);

        const payload = { name: validation.name, email: validation.email };
        const token = await this.jwtService.sign(payload);

        let getToken = await this.redisCacheService.get(`${validation.email}`);

        if (!getToken) {
            console.log("토큰이 없어 캐싱합니다.");
            await this.redisCacheService.set(`${validation.email}`, token, {
                ttl: 10000,
            });
            getToken = await this.redisCacheService.get(`${validation.email}`);
        }

        return token;
    }
}
