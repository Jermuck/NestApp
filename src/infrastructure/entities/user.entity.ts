import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TokenEntity } from "./token.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("Users")
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column("varchar", {nullable: false})
    public username: string;

    @ApiProperty()
    @Column("varchar", {nullable: false})
    public password: string;

    @ApiProperty()
    @Column("varchar", {nullable: false, unique: true})
    public email: string;

    @ApiProperty()
    @CreateDateColumn({name: 'CreateTime'})
    public createDate: Date;

    @ApiProperty()
    @UpdateDateColumn({name: "UpdateTime"})
    public updateDate: Date;

    @ApiProperty()
    @Column("varchar", {nullable: true})
    public description: string;

    @OneToOne(() => TokenEntity, (token) => token.user, {onDelete:"SET NULL"})
    @JoinColumn()
    public token: TokenEntity
}