import { Module } from "@nestjs/common";
import { config } from "../config/typeorm/typeorm.config";
import { TypeormModule } from "../config/typeorm/typeorm.module";
import { UserRepository } from "./user-repository/user.repository";

@Module({
    imports:[TypeormModule],
    providers:[
        UserRepository
    ],
    exports:[
        UserRepository
    ]
})
export class RepositoryModule { };