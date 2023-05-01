import { User, UserProfileMeta, Provider } from "@prisma/client";

export class CreateUserLocalDto
    implements
        Pick<User, "email" | "name" | "password" | "imageUrl">,
        Pick<UserProfileMeta, "age" | "gender" | "phone" | "provider">
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

    /**
     * @minLength 10
     * @maxLength 15
     */
    phone: string;

    provider: Provider;

    imageUrl: string | null;
}
