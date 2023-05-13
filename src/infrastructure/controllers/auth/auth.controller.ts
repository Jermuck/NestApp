import { Body, Controller, Get, HttpCode, Inject, Post, Request, Res, UseGuards} from "@nestjs/common";
import { AuthUseCaseModule } from "src/use-cases/auth-usecases/auth.usecases";
import { BodyCanActivate, UserRegisterDto } from "./dto/user.register.dto";
import { Request as Req, Response } from "express";
import { ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUseCase } from "src/use-cases/auth-usecases/usecase-blocks/auth.usecase";
import { UserLoginDto } from "./dto/user.login.dto";
import { AuthGuard } from "src/infrastructure/common/guard/auth.guard";

@Controller("/auth")
@ApiTags("Authorization")
export class AuthController {
    constructor(
        @Inject(AuthUseCaseModule.AUTHORIZATION)
        private readonly RegisterUseCaseInstanse: AuthUseCase
    ) { };

    @Post("/register")
    @HttpCode(200)
    @ApiBody({type:UserRegisterDto})
    @ApiOperation({description:"Registration"})
    public async register(@Body() dto: UserRegisterDto, @Request() req: Req ){
        const { access, header, data } = await this.RegisterUseCaseInstanse.register(dto);
        req.res.setHeader("Set-Cookie", header);
        return { access, data};
    };

    @Post("/login")
    @HttpCode(200)
    @ApiBody({type:UserLoginDto})
    @ApiOperation({description:"Login"})
    public async login(@Body() dto: UserLoginDto, @Request() req: Req ){
        const { access, header, data } = await this.RegisterUseCaseInstanse.login(dto);
        req.res.setHeader("Set-Cookie", header);
        return { access, data };
    };

    @Post("/logout")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiOperation({description: "Logout"})
    public async logout(@Body() dto:BodyCanActivate, @Res({passthrough: true}) res:Response){
        const result = await this.RegisterUseCaseInstanse.logout(dto._id);
        res.clearCookie("Refresh");
        return result;
    }

    @Get("/refresh")
    @HttpCode(200)
    @ApiOperation({description: "Refresh"})
    public async refresh(@Request() req:Req){
        const token = await this.RegisterUseCaseInstanse.refresh(req.cookies["Refresh"]);
        return token;
    }
};