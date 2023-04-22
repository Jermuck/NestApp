import { Body, Controller, HttpCode, Module, Post } from "@nestjs/common";
import { UserDto } from "./dto";
import { UserRepository } from "src/infrastructure/repositories/user-repository/user.repository";
@Controller("/api")
export class UserController{
    constructor(
        private readonly UserRepository: UserRepository
    ){};

    @Post('/register')
    @HttpCode(200)
    public async register(@Body() dto: UserDto){
        const newUser = await this.UserRepository.create(dto);
        return newUser;
    }
}