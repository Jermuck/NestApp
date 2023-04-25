import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { UserEntity } from "src/infrastructure/entities/user.entity";
import { JwtAdapter } from "../jwt.service";

describe("JwtSevice", () => {
    let service: JwtAdapter;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[JwtModule.register({})],
            providers:[JwtAdapter]
        }).compile();

        service = module.get(JwtAdapter);
    });
    
    describe("Create token for user", () => {
        const mockData:UserEntity = {
            id: 1,
            username: "Kirill",
            password: "1egot200556",
            email: "bardyugov56@bk.ru",
            friends: []
        };
        let token:string;
        it("It must be token", () => {
            token = service.create(mockData, "3s");
            expect(token).toBeDefined();
        });

        it("It must be mockData", async () => {
            const data = await service.validateToken(token);
            expect(data).toBeDefined()
        });
    });
});