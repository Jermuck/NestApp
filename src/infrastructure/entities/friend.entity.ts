import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany, OneToOne
} from "typeorm";
import { UserEntity } from "./user.entity";
import { JoinColumn } from "typeorm";

@Entity("Friends")
export class FriendEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => UserEntity, user => user.id)
  @JoinColumn()
  public user: UserEntity;

  @OneToMany(() => UserEntity, user => user.id)
  @JoinColumn()
  public friends: UserEntity[];
}
