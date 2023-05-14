import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export namespace ResultAuthorization{
    export class Auth {
        @ApiProperty()
        access:string;
        header: string;
        @ApiProperty()
        user: UserEntity;
    };

    export class Logout{
        @ApiProperty()
        message: string;
    };

    export class Refresh{
        @ApiProperty()
        access: string;
        header: string;
    }
};
