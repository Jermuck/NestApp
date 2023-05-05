import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../config/typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { TokenEntity } from "../entities/token.entity";
import { UserRepository } from "./users-repository/users.reposiory";
import { TokensRepository } from "./tokens-repository/tokens.repository";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (cfg:ConfigService) => {
              const instanse = new TypeOrmConfigService(cfg);
              const config = instanse.createTypeOrmOptions();
              return config;  
            },
            inject: [ConfigService] 
        }),
        TypeOrmModule.forFeature([UserEntity, TokenEntity])
    ],
    providers:[
        UserRepository,
        TokensRepository
    ],
    exports:[
        UserRepository,
        TokensRepository
    ]
})
export class RepositoryModule {};