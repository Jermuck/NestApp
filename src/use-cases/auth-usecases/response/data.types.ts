import { UserEntity } from "src/infrastructure/entities/user.entity";

export class DataReponseAuth{
    public readonly username: string;
    public readonly email: string;
    public readonly description: string;
    public readonly createDate: Date;
    public readonly updateDate: Date;

    constructor(object: UserEntity){
        this.username = object.username;
        this.email = object.email;
        this.description = object.description;
        this.createDate = object.createDate;
        this.updateDate = object.updateDate;
    }
};