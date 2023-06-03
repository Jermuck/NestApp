import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { ResultAuthorization } from "src/use-cases/auth-usecases/response-data/response.interfaces";
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter";
import { UserRegisterDto } from "src/infrastructure/controllers/auth/dto/user.register.dto";
import { UserLoginDto } from "src/infrastructure/controllers/auth/dto/user.login.dto";
import { TokenAbstractRepository } from "src/domain/repositories/token-repository/token-repository.adapter";
import { JwtAbstractAdapter } from "src/domain/adapters/jwt-adapter/jwt.adapter";

export class AuthUseCase {
    constructor(
        private readonly UserRepository: UserAbstractReposiotory,
        private readonly TokenRepository: TokenAbstractRepository,
        private readonly bcrypt: BcryptAbstractAdapter,
        private readonly JwtService: JwtAbstractAdapter<UserEntity>,
        private readonly config: ConfigService
    ) { };

    private generateTokens(user: UserEntity): [string, string] {
        const access = this.JwtService.create(user, this.config.get<number>("TIME_ACCESS"));
        const refresh = this.JwtService.create(user, this.config.get<number>("TIME_REFRESH"));
        return [access, refresh];
    };

    private generateHeader(token: string): string {
        return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.config.get<number>("TIME_REFRESH")}`
    };

    public async register(data: UserRegisterDto): Promise<ResultAuthorization.Auth> {
        const validate = await this.UserRepository.getByEmail(data.email);
        if (validate) {
            throw new BadRequestException("This user already login");
        }
        const hashPassword = await this.bcrypt.hash(data.password);
        const user = await this.UserRepository.save({ ...data, password: hashPassword });
        const [access, refresh] = this.generateTokens({ ...user });
        await this.TokenRepository.save({ token: access, user })
        const header = this.generateHeader(refresh);
        delete user.token;
        return {
            access,
            header,
            user
        }
    };

    public async login(data: UserLoginDto): Promise<ResultAuthorization.Auth> {
        const user = await this.UserRepository.getByEmail(data.email);
        if (!user) {
            throw new BadRequestException("You are not login");
        }
        const isPassword = await this.bcrypt.unHash(data.password, user.password);
        if (!isPassword) {
            throw new BadRequestException("Your password not verify")
        }
        const tokenRelation = user.token;
        delete user.token;
        const [access, refresh] = this.generateTokens({ ...user });
        const header = this.generateHeader(refresh);
        if (tokenRelation) {
            await this.TokenRepository.update(tokenRelation.id, refresh);
        } else {
            await this.TokenRepository.save({ token: refresh, user: user });
        }
        return {
            access,
            header,
            user
        }
    };

    public async logout(id: number): Promise<ResultAuthorization.Logout> {
        const token = await this.TokenRepository.getByUserId(id);
        if (!token) {
            throw new BadRequestException("You are already logout");
        }
        await this.TokenRepository.delete(token.id);
        return { message: "Logout success" };
    };

    public async refresh(token: string): Promise<ResultAuthorization.Refresh> {
        const payload = this.JwtService.validateToken(token);
        if(!payload) throw new UnauthorizedException();
        const tokenWithRelation = await this.TokenRepository.getByUserId(payload.id);
        if(!tokenWithRelation) throw new UnauthorizedException();
        const user = this.UserRepository.createSync(payload);
        const [access, refresh] = this.generateTokens({ ...user });
        await this.TokenRepository.update(tokenWithRelation.id, refresh);
        const header = this.generateHeader(refresh);
        return { access, header };
    };
};
