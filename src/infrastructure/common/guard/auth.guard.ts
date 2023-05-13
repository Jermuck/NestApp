import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly JwtService:JwtAdapter
    ){};

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request:Request = context.switchToHttp().getRequest();
        let token = request.headers.authorization;
        if (!token){
            throw new UnauthorizedException("You are don't have token");
        }
        token = token.split(" ")[1];
        const user = await this.JwtService.validateToken(token);
        if(!user){
            throw new UnauthorizedException();
        }
        request.body = {
            ...request.body,
            _id: user.id
        };
        return true;
    }
}