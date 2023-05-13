import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthUseCaseModule } from "src/use-cases/auth-usecases/auth.usecases";
import { JwtAbstractAdapter } from "src/domain/adapters/jwt-adapter/jwt.adapter";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";
import { AuthGuard } from "src/infrastructure/common/guard/auth.guard";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";

@Module({
    controllers:[AuthController],
    imports:[
        AuthUseCaseModule.register(),
        JwtAdapterModule
    ],
    providers:[
    ]
})
export class AuthModule {};