import { UserModel } from "src/domain/models/user.model";
import { AbstractRepository } from "../global-repository/repository.abstract";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export abstract class UserAbstractReposiotory extends AbstractRepository<UserModel, UserEntity>{
    abstract getByEmail(email: string): Promise<UserEntity | null>;
    abstract getByIdWithAllRelations(id:number): Promise<UserEntity | null>
};