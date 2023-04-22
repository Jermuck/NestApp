import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { config } from "./typeorm.config";

@Module({
    imports:[
        TypeOrmModule.forRoot(config),
    ],
    exports:[
        TypeormModule
    ]
})
export class TypeormModule { };
