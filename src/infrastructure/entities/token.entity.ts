import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("Token")
export class TokenEntity{
    @PrimaryGeneratedColumn({type: "integer"})
    public id: number;

    @Column("varchar")
    public token: string;

    @OneToOne(() => UserEntity, (user) => user.token)
    public user: UserEntity;
};