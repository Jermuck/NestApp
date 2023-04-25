import { Injectable } from "@nestjs/common";
import { IJwtService } from "src/domain/adapters/jwt-adapter/jwt.interface";
import { JwtService} from "@nestjs/jwt";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import {config} from "dotenv";

config()
@Injectable()
export class JwtAdapter implements IJwtService<UserEntity> {

    constructor(private readonly jwt: JwtService) {};

    public create(data: UserEntity, expiresIn: string): string {
        const token = this.jwt.sign(data, {
            expiresIn, 
            secret: process.env.SECRET_KEY
        });
        return token;
    };

    public async validateToken(token: string): Promise<UserEntity> {
        try{
            const validate = await this.jwt.verify(token, {
                secret: process.env.SECRET_KEY
            });
            return validate;
        }catch(err){
            return; 
        }
    };
};