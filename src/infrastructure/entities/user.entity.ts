import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TokenEntity } from "./token.entity";

@Entity("UserTable")
export class UserEntity{
    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column("varchar", {unique:true})
    public email: string;

    @Column("varchar")
    public username:string;

    @Column("varchar")
    public password: string;

    @OneToMany(() => UserEntity, (user:UserEntity) => user.id)
    @JoinColumn()
    public friends?: UserEntity[];

    @OneToOne(() => TokenEntity, (token: TokenEntity) => token.id)
    @JoinColumn()
    public token?: TokenEntity;
}