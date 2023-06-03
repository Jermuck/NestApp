import { FriendModel } from "../../models/friend.model";
import { FriendEntity } from "../../../infrastructure/entities/friend.entity";
import { UserEntity } from "../../../infrastructure/entities/user.entity";

export abstract class FriendRepositoryAbstract {
    abstract createSync(friend: FriendModel): FriendEntity;
    abstract getFriendsByUserId(userId: number): Promise<FriendEntity>;
    abstract addFriend(userId: number, friend: UserEntity): Promise<FriendEntity>;
    abstract save(friend: FriendEntity): Promise<FriendEntity>;
    abstract deleteFriend(id:number, id_friend: number): Promise<FriendEntity>;
}