import { DynamicModule, Module } from "@nestjs/common";
import { TokensRepository } from "src/infrastructure/repositories/tokens-repository/tokens.repository";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { RegisterUseCase } from "./usecase-blocks/register.usecase";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";


@Module({})
export class AuthUseCase{
    static REGISTER_USECASE = "REGISTER_USECASE";

    static register():DynamicModule {
        return {
            module: AuthUseCase,
            providers:[
                {
                    inject:[UserRepository, TokensRepository, JwtAdapter],
                    useFactory: (userRepo: UserRepository, tokenRepo: TokensRepository, jwt:JwtAdapter) => new RegisterUseCase(userRepo, tokenRepo, jwt),
                    provide: this.REGISTER_USECASE 
                }
            ],
            exports:[
                this.REGISTER_USECASE
            ],
            imports:[RepositoryModule, JwtAdapterModule]
        }
    }
}