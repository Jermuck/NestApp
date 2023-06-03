import { DynamicModule } from "@nestjs/common";
import { FriendRepository } from "../../infrastructure/repositories/friends-repository/friends.repository";
import { UserRepository } from "../../infrastructure/repositories/users-repository/users.reposiory";
import { FriendsUsecase } from "./usecase-blocks/friends.usecase";
import { RepositoryModule } from "../../infrastructure/repositories/repository.module";

export class FriendUseCaseModule {
  static FRIEND_USECASE = "FRIEND_USECASE";

  static register(): DynamicModule {
    return {
      module: FriendUseCaseModule,
      providers: [
        {
          inject: [FriendRepository, UserRepository],
          useFactory: (
            friendRepo: FriendRepository,
            userRepo: UserRepository
          ) => new FriendsUsecase(friendRepo, userRepo),
          provide: this.FRIEND_USECASE
        }
      ],
      exports: [
        this.FRIEND_USECASE
      ],
      imports: [
        RepositoryModule
      ]
    }
  }
}
