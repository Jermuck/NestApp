import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("TokenTable")
export class TokenEntity {
    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column("varchar")
    public token: string;

    @OneToOne(() => UserEntity, (user:UserEntity) => user.id)
    @JoinColumn()
    public user: UserEntity;
};