import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class UserDto{
    @Length(5, 15)
    public readonly username: string;

    @Length(7, 20)
    public readonly password: string;

    public readonly description: string;

    @IsEmail()
    @Length(7, 25)
    public readonly email: string;
}