import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAbstractRepository } from "src/domain/repositories/user-repository.abstract"
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserModel } from "src/domain/models/user.model";
import { TokenEntity } from "src/infrastructure/entities/token.entity";

@Injectable()
export class UserRepository implements UserAbstractRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ){ };

    public async create(user: UserModel, token: TokenEntity): Promise<UserEntity> {
        try{
            const newUser = this.userEntityRepository.create({
                ...user,
                token:token
            });
            await this.userEntityRepository.save(newUser);
            return newUser;
        }catch(err){
            return;
        }
    };

    public async delete(id: number): Promise<boolean> {
        try{
            await this.userEntityRepository.delete({
                id
            });
            return true;
        }catch(err){
            return;
        }
    };

    public async addFriend(user_id: number): Promise<void> {
        
    };

};