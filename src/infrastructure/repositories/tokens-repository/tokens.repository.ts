import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenModel } from "src/domain/models/token.model";
import { AbstractRepository } from "src/domain/repositories/globalRepository/repository.abstract";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokensRepository implements AbstractRepository<TokenModel, TokenEntity>{
    constructor(
        @InjectRepository(TokenEntity)
        private readonly TokenEntityRepository:Repository<TokenEntity>
    ){ };

    public async createAsync(data: TokenModel): Promise<TokenEntity | null> {
        try{
            let token = this.TokenEntityRepository.create(data);
            token = await this.TokenEntityRepository.save(token);
            return token;
        }catch(err){
            return null;
        }
    };

    public createSync(data: TokenModel): TokenEntity {
        return this.TokenEntityRepository.create(data);
    };

    public async delete(id: number): Promise<boolean | null> {
        try{
            await this.TokenEntityRepository.delete({
                id
            });
            return true;
        }catch(err){
            return null;
        };
    };

    public async update(id: number): Promise<TokenEntity | null> {
        return null;
    };

    public async getById(id: number): Promise<TokenEntity | null> {
        try{
            const token = await this.TokenEntityRepository.findOne({
                where:{
                    id
                }
            });
            return token;
        }catch(err){
            return null;
        }
    }
}