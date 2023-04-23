import { Injectable } from "@nestjs/common";
import { IJwtService } from "src/domain/adapters/jwt-adapter/jwt.interface";
import { UserModel } from "src/domain/models/user.model";
import { JwtService} from "@nestjs/jwt";
import dotenv from "dotenv";

dotenv.config()

@Injectable()
export class JwtAdapter implements IJwtService<UserModel> {

    constructor(private readonly jwt: JwtService) {};

    public create(data: UserModel, expiresIn: string): string {
        const token = this.jwt.sign(data, {
            expiresIn, 
            secret: process.env.SECRET_KEY
        });
        return token;
    };

    public async validateToken(token: string): Promise<UserModel> {
        const validate = await this.jwt.verify(token, {
            secret: process.env.SECRET_KEY
        });
        return validate;
    };
};