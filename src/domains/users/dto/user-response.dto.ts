import { Exclude, Expose } from "class-transformer";
import { User } from "@prisma/client";

export class UserResponseDto {
    @Exclude() private readonly _userId: number;
    @Exclude() private readonly _name: string;
    @Exclude() private readonly _email: string;

    constructor(user: User) {
        this._userId = user.userId;
        this._name = user.name;
        this._email = user.email;
    }

    @Expose()
    userId(): number {
        return this._userId;
    }

    name(): string {
        return this._name;
    }

    email(): string {
        return this._email;
    }
}
