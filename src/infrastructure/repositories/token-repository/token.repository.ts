import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenAbstractRepository } from "src/domain/repositories/token-repository.abstract";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenRepository implements TokenAbstractRepository {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenEntityRepository: Repository<TokenEntity>
    ) {};

    public async create(token: string): Promise<TokenEntity> {
        try{
            const newToken = this.tokenEntityRepository.create()
        }catch(err){
            return; 
        }
    }
}