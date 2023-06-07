import { BodyCanActivate } from "../../auth/dto/user.register.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class BookDto extends BodyCanActivate {
  @Length(5, 25)
  @ApiProperty()
  public readonly name: string;
}

export class BookUpdateDto extends BookDto {
  @Length(5, 25)
  @ApiProperty()
  public readonly updateName: string;
}
