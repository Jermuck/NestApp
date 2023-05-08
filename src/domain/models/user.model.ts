import { TokenEntity } from "src/infrastructure/entities/token.entity";

export interface UserModel {
    readonly username:string;
    readonly password:string;
    readonly description: string
    token?: TokenEntity;
};