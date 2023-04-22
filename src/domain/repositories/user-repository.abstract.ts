import { UserEntity } from "src/infrastructure/entities/user.entity";
import { UserModel } from "../models/user.model";

export abstract class UserAbstractRepository{
    abstract create(user: UserModel): Promise<UserEntity>;
    abstract delete(id: number): Promise<boolean>;
    abstract addFriend(user_id: number): Promise<void>;
};