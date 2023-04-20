export abstract class UserAbstractRepository{
    abstract create(user: UserModel): Promise<UserModel>;
    abstract delete(id: number): Promise<void>;
    abstract addFriend(user_id: number): Promise<void>;
};