import { UserModel } from "src/domain/models/user.model";
import { AbstractRepository } from "../globalRepository/repository.abstract";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export abstract class UserAbstractReposiotory extends AbstractRepository<UserModel, UserEntity>{
    abstract getByEmail(email: string): Promise<UserEntity | null>;
    abstract createSync(data:UserModel): UserEntity;
};