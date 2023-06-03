import { FriendRepositoryAbstract } from "../../../domain/repositories/friend-repository/friend-repository.abstract";
import { UserAbstractReposiotory } from "../../../domain/repositories/user-repository/user-repository.abstract";
import { FriendEntity } from "../../../infrastructure/entities/friend.entity";
import { UserEntity } from "../../../infrastructure/entities/user.entity";
import { BadRequestException } from "@nestjs/common";

export class FriendsUsecase {
  constructor(
    private readonly FriendRepository: FriendRepositoryAbstract,
    private readonly UserRepository: UserAbstractReposiotory
  ) { };

  private validateFriendArray(friendId: number, friendArray: UserEntity[]): boolean {
    const arrayOfId = friendArray.map(el => el.id);
    return friendId in arrayOfId;
  }

  public async addFriend(userId: number, friendId: number): Promise<FriendEntity> {
    const currentUser = await this.UserRepository.getById(userId);
    const addUser = await this.UserRepository.getById(friendId);
    if (!addUser || userId === friendId) throw new BadRequestException("This friends not found");
    console.log("DA")
    const friends = await this.FriendRepository.getFriendsByUserId(userId);
    console.log(friends)
    if (!friends) {
      const newFriendModel = this.FriendRepository.createSync({ user: currentUser, friends: [addUser] });
      return await this.FriendRepository.save(newFriendModel);
    } else {
      return await this.FriendRepository.addFriend(userId, addUser);
    }
  }
}
