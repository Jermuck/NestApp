import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenModel } from "src/domain/models/token.model";
import { AbstractRepository } from "src/domain/repositories/globalRepository/repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { UserDto } from "src/infrastructure/controllers/auth/dto/user.dto";
import { TokenEntity } from "src/infrastructure/entities/token.entity";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";
import { Response } from "src/domain/response-data/response.interfaces";

export class RegisterUseCase{
    constructor(
        private readonly UserRepository: UserAbstractReposiotory,
        private readonly TokenRepository: AbstractRepository<TokenModel, TokenEntity>,
        private readonly bcrypt: BcryptService,
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

    public async execute(data:UserDto): Promise<Response.Register> {
        const validate = await this.UserRepository.getByEmail(data.email);
        if (!validate){
            throw new BadRequestException("This user already login");
        };
        const hashPassword = await this.bcrypt.hash(data.password);
        const user = await this.UserRepository.createAsync({...data, password:hashPassword});
        const [access, refresh] = this.generateTokens(user);
        const token = this.TokenRepository.createSync({token:refresh, user:user});
        await this.TokenRepository.createAsync(token);
        const header = this.generateHeader(refresh);
        return {access, header};
    };
};