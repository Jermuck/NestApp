import { Module } from "@nestjs/common";
import { FriendUseCaseModule } from "../../../use-cases/friends-usecases/friends.usecases-proxy";
import { JwtAdapterModule } from "../../services/jwt/jwt.module";
import { FriendsController } from "./friends.controller";

@Module({
    controllers:[
        FriendsController
    ],
    imports:[
        FriendUseCaseModule.register(),
        JwtAdapterModule
    ]
})
export class FriendsModule {};