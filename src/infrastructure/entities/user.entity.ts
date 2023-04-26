import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
    public friends?: UserEntity[];
}