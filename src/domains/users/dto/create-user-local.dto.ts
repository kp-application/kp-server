import { User, Profile, Provider } from "@prisma/client";

export class CreateUserLocalDto
    implements
        Pick<User, "email" | "name" | "password">,
        Pick<Profile, "age" | "gender" | "provider">
{
    /**
     * @format email
     * @minLength 5
     * @maxLength 50
     */
    email: string;

    /**
     * @minLength 2
     * @maxLength 5
     */
    name: string;

    /**
     * @minLength 5
     * @maxLength 15
     */
    password: string;

    /**
     * @type int
     * @minimum 12
     * @maximum 99
     */
    age: number;

    /**
     * @minLength 2
     * @maxLength 2
     */
    gender: string;
    provider: Provider;
}
