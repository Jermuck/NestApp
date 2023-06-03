import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export namespace ResultAuthorization {
  export class Auth {
    @ApiProperty()
    public access: string;

    public header: string;

    @ApiProperty()
    public user: UserEntity;
  };

  export class Logout {
    @ApiProperty()
    public message: string;
  };

  export class Refresh {
    @ApiProperty()
    public access: string;

    public header: string;
  };
}
