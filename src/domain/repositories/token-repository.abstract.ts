import { TokenEntity } from "src/infrastructure/entities/token.entity";

export abstract class TokenAbstractRepository {
    abstract create(token:string): Promise<TokenEntity>;
    abstract delete(id:number): Promise<boolean>;
    abstract update(id:number, token:string): Promise<TokenEntity>;
}