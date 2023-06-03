import { Body, Controller, HttpCode, Inject, Post, UseGuards } from "@nestjs/common";
import { FriendUseCaseModule } from "../../../use-cases/friends-usecases/friends.usecases-proxy";
import { FriendsUsecase } from "../../../use-cases/friends-usecases/usecase-blocks/friends.usecase";
import { FriendDto } from "./dto/friend.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../common/guards/auth.guard";

@Controller("/friends")
@ApiTags("Friends")
export class FriendsController{
    constructor(
        @Inject(FriendUseCaseModule.FRIEND_USECASE)
        private readonly FriendUseCaseInstanse: FriendsUsecase  
    ) {};
    
    @Post("/add")
    @HttpCode(200)
    @ApiBody({type: FriendDto})
    @ApiBearerAuth("access-token")
    @ApiOperation({
        description:"Add friends"
    })
    @UseGuards(AuthGuard)
    public async addFriend(@Body() friendDto: FriendDto){
        return await this.FriendUseCaseInstanse.addFriend(friendDto._id, friendDto.friendId);
    };
}