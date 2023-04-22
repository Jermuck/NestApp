import { Module } from "@nestjs/common";
import { UserController } from "./user-controller/user.controller";
import { RepositoryModule } from "../repositories/repositories.module"
@Module({
    imports:[RepositoryModule],
    controllers:[UserController]
})
export class ControllersModule{};