import { UserEntity } from "../../infrastructure/entities/user.entity";

export class FriendModel {
    readonly user:UserEntity;
    readonly friends?: UserEntity[];
}