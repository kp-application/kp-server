import { Controller } from "@nestjs/common";

@Controller({ path: "api/v1/user", version: "1" })
export class UserController {
    constructor() {}
}
