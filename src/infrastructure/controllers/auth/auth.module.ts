import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { AbstractRepository } from "src/domain/repositories/globalRepository/repository.abstract";
import { AuthUseCase } from "src/use-cases/auth-usecases/auth.usecases";

@Module({
    controllers:[AuthController],
    imports:[
        AuthUseCase.register()
    ],
})
export class AuthModule {};