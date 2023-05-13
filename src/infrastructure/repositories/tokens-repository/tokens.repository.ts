import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenModel } from "src/domain/models/token.model";
import { TokenAbstractRepository } from "src/domain/repositories/token-repository/token-repository.adapter";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { Repository, UpdateResult } from "typeorm";

@Injectable()
export class TokensRepository implements TokenAbstractRepository{
    constructor(
        @InjectRepository(TokenEntity)
        private readonly TokenEntityRepository:Repository<TokenEntity>
    ){ };

    public async save(data: TokenModel): Promise<TokenEntity | null> {
        return await this.TokenEntityRepository.save(data);
    };

    public async update(id: number, token: string): Promise<UpdateResult> {
        return await this.TokenEntityRepository
            .createQueryBuilder()
            .update(TokenEntity)
            .set({token:token})
            .where("id = :id", {id:id})
            .execute()
    };

    public async getByUserId(userId: number): Promise<TokenEntity> {
        return await this.TokenEntityRepository.findOne({
            where:{
                user:{
                    id: userId
                }
            }
        })
    }

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
            console.log(err);
            
            return null;
        };
    };

    public async getById(id: number): Promise<TokenEntity | null> {
        const token = await this.TokenEntityRepository.findOne({
            where:{
                id
            },
            relations: {
                user: true
            }
        });
        return token;
    }
}