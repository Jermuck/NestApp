import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AbstractRepository } from "src/domain/repositories/globalRepository/repository.abstract";
import { AuthUseCase } from "src/use-cases/auth-usecases/auth.usecases";
import { RegisterUseCase } from "src/use-cases/auth-usecases/usecase-blocks/register.usecase";
import { UserDto } from "./dto/user.dto";

@Controller("/auth")
export class AuthController {
    constructor(
        @Inject(AuthUseCase.REGISTER_USECASE)
        private readonly create: RegisterUseCase
    ) { };

    @Post("/register")
    public async register(@Body() dto:UserDto){
        return await this.create.execute(dto);
    };
};