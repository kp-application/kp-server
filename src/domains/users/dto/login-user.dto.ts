import { User } from "@prisma/client";

export class LoginUserDto implements Pick<User, "email" | "password"> {
    /**
     * @format email
     * @minLength 5
     * @maxLength 50
     */
    email: string;

    /**
     * @minLength 5
     * @maxLength 15
     */
    password: string;
}
