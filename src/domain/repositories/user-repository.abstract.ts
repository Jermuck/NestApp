import { UserEntity } from "src/infrastructure/entities/user.entity";
import { UserModel } from "../models/user.model";
import { TokenEntity } from "src/infrastructure/entities/token.entity";

export abstract class UserAbstractRepository{
    abstract create(user: UserModel, token: TokenEntity): Promise<UserEntity>;
    abstract delete(id: number): Promise<boolean>;
    abstract addFriend(user_id: number): Promise<void>;
};