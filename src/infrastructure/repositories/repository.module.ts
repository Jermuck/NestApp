import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "../config/typeorm.config";
import { UserEntity } from "../entities/user.entity";
import { TokenEntity } from "../entities/token.entity";
import { UserRepository } from "./users-repository/users.reposiory";
import { TokensRepository } from "./tokens-repository/tokens.repository";
import { FriendRepository } from "./friends-repository/friends.repository";
import { FriendEntity } from "../entities/friend.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (cfg:ConfigService) => {
              const instanse = new TypeOrmConfigService(cfg);
              return instanse.createTypeOrmOptions();
            },
            inject: [ConfigService] 
        }),
        TypeOrmModule.forFeature([UserEntity, TokenEntity, FriendEntity])
    ],
    providers:[
        UserRepository,
        TokensRepository,
        FriendRepository
    ],
    exports:[
        UserRepository,
        TokensRepository,
        FriendRepository
    ]
})
export class RepositoryModule {};