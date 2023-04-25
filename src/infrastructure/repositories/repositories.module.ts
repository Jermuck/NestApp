import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBconfig } from "../config/typeorm/typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./user-repository/user.repository";

@Module({
    imports:[
        TypeOrmModule.forRoot(DBconfig),
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers:[
        UserRepository
    ],
    exports:[
        UserRepository
    ]
})
export class RepositoryModule { };