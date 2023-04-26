import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAbstractRepository } from "src/domain/repositories/user-repository.abstract"
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserModel } from "src/domain/models/user.model";

@Injectable()
export class UserRepository implements UserAbstractRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ){ };

    public async create(user: UserModel): Promise<UserEntity> {
        try{
            const newUser = await this.userEntityRepository.save(user);
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