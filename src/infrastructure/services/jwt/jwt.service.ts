import { Injectable } from "@nestjs/common";
import { JwtService} from "@nestjs/jwt";
import { UserEntity } from "../../entities/user.entity";
import { ConfigService } from "@nestjs/config";
import {IJwtService} from "../../../domain/adapters/jwt-adapter/jwt.adapter";

@Injectable()
export class JwtAdapter implements IJwtService<UserEntity> {

    private readonly secret_key: string;

    constructor(private readonly jwt: JwtService, private readonly config:ConfigService) {
        this.secret_key = this.config.get<string>("SECRET_KEY");
    };


    public create(data: UserEntity, expiresIn: string): string {
        const token = this.jwt.sign(data, {
            expiresIn, 
            secret:this.secret_key
        });
        return token;
    };

    public async validateToken(token: string): Promise<UserEntity | null> {
        try{
            const validate = await this.jwt.verify(token, {
                secret: this.secret_key
            });
            return validate;
        }catch(err){
            return null; 
        }
    };
};