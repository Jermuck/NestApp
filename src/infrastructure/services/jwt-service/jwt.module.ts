import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "./jwt.service";

@Module({
    providers:[JwtAdapter],
    exports:[JwtAdapter],
    imports:[
        JwtModule.register({})
    ]
})
export class JwtAdapterModule { };