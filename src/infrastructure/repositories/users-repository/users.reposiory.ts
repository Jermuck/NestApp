import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/domain/models/user.model";
import { AbstractRepository} from "src/domain/repositories/globalRepository/repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements UserAbstractReposiotory{
    constructor(
        @InjectRepository(UserEntity)
        private readonly UserEntityRepository: Repository<UserEntity>
    ){};

    public async save(data: UserEntity): Promise<UserEntity> {
        return await this.UserEntityRepository.save(data);
    };

    public createSync(data: UserModel): UserEntity {
        return this.UserEntityRepository.create(data);
    }

    public async delete(id: number): Promise<boolean | null> {
        try{
            await this.UserEntityRepository.delete({ id });
            return true;
        }catch(err){
            return null;
        }
    };

    public async getById(id: number): Promise<UserEntity | null> {
        const user = await this.UserEntityRepository.findOne({
            where:{
                id
            },
            relations:{
                token: true
            }
        });
        return user;
    };

    public async getByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.UserEntityRepository.findOne({
            where: {
                email
            },
            relations: {
                token: true
            }
        });
        return user; 
    };
}