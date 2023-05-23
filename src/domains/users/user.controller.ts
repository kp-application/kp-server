import { Controller, Post, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { TypedRoute } from "@nestia/core";
import { FileInterceptor } from "@nestjs/platform-express";

import { MulterBuilder } from "src/common/builders/multer/multer.builder";
import { UserService } from "src/domains/users/user.service";
import { AuthGuard } from "src/domains/auth/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";
import { UserResponseDto } from "src/domains/users/dto/user-response.dto";

@UseInterceptors(LoggingInterceptor)
@Controller({ path: "api/v1/user", version: "1" })
export class UserController {
    constructor(private readonly userService: UserService) {}

    @TypedRoute.Post("profile-image")
    @UseInterceptors(FileInterceptor("file", new MulterBuilder().setAllowProfileImage().build()))
    async uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
        // const result = await this.userService.updateUserImage(file);
        return "here";
    }

    @TypedRoute.Get("guard")
    // @UseGuards(AuthGuard)
    async test(@User() user: any) {
        try {
            const result = await this.userService.updateUserImage("bee@admin.com");

            console.log("result", result);

            return {
                message: "success",
                statusCode: 200,
                data: user,
            };
        } catch (err) {
            console.log(err);
        }
    }
}
