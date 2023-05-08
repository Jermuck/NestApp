import { Body, Controller, HttpCode, Inject, Post, Request} from "@nestjs/common";
import { AuthUseCase } from "src/use-cases/auth-usecases/auth.usecases";
import { RegisterUseCase } from "src/use-cases/auth-usecases/usecase-blocks/register.usecase";
import { UserDto } from "./dto/user.dto";
import { Request as Req } from "express";

@Controller("api/auth")
export class AuthController {
    constructor(
        @Inject(AuthUseCase.REGISTER_USECASE)
        private readonly RegisterUseCaseInstanse: RegisterUseCase
    ) { };

    @Post("/register")
    @HttpCode(200)
    public async register(@Body() dto: UserDto, @Request() req: Req ){
        const { access, header, data } = await this.RegisterUseCaseInstanse.execute(dto);
        req.res.setHeader("Set-Cookie", header);
        return { access, data};
    };
};