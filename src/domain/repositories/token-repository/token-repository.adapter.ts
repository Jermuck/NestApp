import { TokenModel } from "src/domain/models/token.model";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { AbstractRepository } from "../global-repository/repository.abstract";
import { UpdateResult } from "typeorm";

export abstract class TokenAbstractRepository extends AbstractRepository<TokenModel, TokenEntity> {
    abstract update(id:number, token:string): Promise<UpdateResult>;
    abstract getByUserId(userId:number): Promise<TokenEntity>
};