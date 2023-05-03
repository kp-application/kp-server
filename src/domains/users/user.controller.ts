import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { TypedRoute } from "@nestia/core";
import { FileInterceptor } from "@nestjs/platform-express";

import { MulterBuilder } from "src/common/builders/multer/multer.builder";

@Controller({ path: "api/v1/user", version: "1" })
export class UserController {
    constructor() {}

    @TypedRoute.Post("image")
    @UseInterceptors(FileInterceptor("file", new MulterBuilder().build()))
    async uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return "here";
    }
}
