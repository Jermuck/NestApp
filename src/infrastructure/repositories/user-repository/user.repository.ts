import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAbstractRepository } from "src/domain/repositories/user.repository";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements UserAbstractRepository{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ){ };

    public async create(user: UserModel): Promise<UserModel> {
        const newUser = this.userEntityRepository.save(user);
        return newUser;
    };

    public async delete(id: number): Promise<void> {
        
    };

    public async addFriend(user_id: number): Promise<void> {
        
    };

};