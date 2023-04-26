import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBconfig } from "../config/typeorm/typeorm.config";
import { TokenEntity } from "../entities/token.entity";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./user-repository/user.repository";

@Module({
    imports:[
        TypeOrmModule.forRoot(DBconfig),
        TypeOrmModule.forFeature([UserEntity, TokenEntity])
    ],
    providers:[
        UserRepository
    ],
    exports:[
        UserRepository
    ]
})
export class RepositoryModule { };