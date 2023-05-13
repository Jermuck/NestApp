import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TokenEntity } from "./token.entity";

@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("varchar", {nullable: false})
    public username: string;

    @Column("varchar", {nullable: false})
    public password: string;

    @Column("varchar", {nullable: false, unique: true})
    public email: string;

    @CreateDateColumn({name: 'CreateTime'})
    public createDate: Date;

    @UpdateDateColumn({name: "UpdateTime"})
    public updateDate: Date;

    @Column("varchar", {nullable: true})
    public description: string;

    @OneToOne(() => TokenEntity, (token) => token.user, {onDelete:"SET NULL"})
    @JoinColumn()
    public token: TokenEntity
}