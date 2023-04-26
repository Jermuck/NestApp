import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserRepository } from "src/infrastructure/repositories/user-repository/user.repository";

@Controller("/api")
export class UserController {
    constructor(
        private readonly userRepository: UserRepository
    ){ };

    @Post('/register')
    @HttpCode(200)
    public async register(@Body() dto: UserDto){};
};