import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractRepository } from "src/domain/repositories/globalRepository/repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { UserDto } from "src/infrastructure/controllers/auth/dto/user.dto";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";
import { Response } from "src/domain/response-data/response.interfaces";
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter";
import { TokenModel } from "src/domain/models/token.model";

export class RegisterUseCase{
    constructor(
        private readonly UserRepository: UserAbstractReposiotory,
        private readonly TokenRepository: AbstractRepository<TokenModel, TokenEntity>,
        private readonly bcrypt: BcryptAbstractAdapter,
        private readonly JwtService: JwtAdapter,
        private readonly config:ConfigService
    ){ };

    private generateTokens(user:UserEntity): [string, string] {
        const access = this.JwtService.create(user, this.config.get<string>("TIME_ACCESS"));
        const refresh = this.JwtService.create(user, this.config.get<string>("TIME_REFRESH"));
        return [access, refresh];
    };

    private generateHeader(token:string): string {
        return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 10}`
    };

    public async execute(data:UserDto): Promise<Response.Auth<UserEntity>> {
        const validate = await this.UserRepository.getByEmail(data.email);
        if (validate){
            throw new BadRequestException("This user already login");
        };
        const hashPassword = await this.bcrypt.hash(data.password);
        const user = await this.UserRepository.save({...data, password: hashPassword});
        const [access, refresh] = this.generateTokens(user);
        await this.TokenRepository.save({token:access, user})
        const header = this.generateHeader(refresh);
        return {
            access, 
            header, 
            data:user
        };
    };
};