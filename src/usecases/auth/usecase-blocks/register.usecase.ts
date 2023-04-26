import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter";
import { IJwtService } from "src/domain/adapters/jwt-adapter/jwt.interface";
import { UserAbstractRepository } from "src/domain/repositories/user-repository.abstract";
import { UserDto } from "src/infrastructure/controllers/user-controller/dto/user.dto";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export class UseCaseRegister{
    constructor(
        private readonly _JwtService: IJwtService<UserEntity>,
        private readonly _BcryptService: BcryptAbstractAdapter,
        private readonly _UserRepository: UserAbstractRepository
    ) {};

    public async execute(user: UserDto){
    
    };
}