import { Injectable } from "@nestjs/common";
import { FriendRepositoryAbstract } from "../../../domain/repositories/friend-repository/friend-repository.abstract";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendEntity } from "../../entities/friend.entity";
import { Repository } from "typeorm";
import { FriendModel } from "../../../domain/models/friend.model";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class FriendRepository implements FriendRepositoryAbstract {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly FriendEntityRepository: Repository<FriendEntity>
  ) { }

  public createSync(friend: FriendModel): FriendEntity {
    return this.FriendEntityRepository.create(friend);
  };

  public async save(friend: FriendEntity): Promise<FriendEntity> {
    return this.FriendEntityRepository.save(friend);
  };

  public async getFriendsByUserId(userId: number): Promise<FriendEntity> {
    return await this.FriendEntityRepository.findOne({
      where: {
        user: {
          id: userId
        }
      },
      relations: {
        friends: true
      }
    });
  };

  public async addFriend(userId: number, friend: UserEntity): Promise<FriendEntity> {
    const friendById = await this.getFriendsByUserId(userId);
    console.log(friendById);
    if (!friendById) return undefined;
    await this.FriendEntityRepository
      .createQueryBuilder()
      .update(FriendEntity)
      .set({ friends: [...friendById.friends, friend] })
      .where("id = :id", { id: friendById.id })
      .execute()
    return {} as FriendEntity;
  };

  public async deleteFriend(id: number, id_friend: number): Promise<FriendEntity> {
    const friendById = await this.getFriendsByUserId(id);
    if (!friendById) {
      return undefined;
    }
    const updateFriend = await this.FriendEntityRepository.update(
      { id }, { friends: friendById.friends.filter(el => el.id != id_friend) }
    );
    return updateFriend.raw;
  };
}
