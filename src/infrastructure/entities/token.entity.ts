import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("Tokens")
export class TokenEntity{
    @PrimaryGeneratedColumn("uuid")
    public id: number;

    @Column("text")
    public token: string;

    @OneToOne(() => UserEntity, (user) => user.token)
    public user: UserEntity;
};