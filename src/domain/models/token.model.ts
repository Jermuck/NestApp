import { UserEntity } from "src/infrastructure/entities/user.entity";

export interface TokenModel {
    readonly token: string;
    user?: UserEntity;
}