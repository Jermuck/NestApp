import { BodyCanActivate } from "../../auth/dto/user.register.dto";
import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FriendDto extends BodyCanActivate{
    @IsNumber()
    @ApiProperty({required: true})
    readonly friendId: number;
}