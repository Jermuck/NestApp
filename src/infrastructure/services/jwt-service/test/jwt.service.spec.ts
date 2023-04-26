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
        service = module.get<JwtAdapter>(JwtAdapter);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    });

    const mockData:UserEntity = {
        id: 1,
        username: "Test",
        password: "String",
        email: "String@mail.ru"
    };
    let token: string;

    describe("GeneratingToken", () => {
        it("Should be string", () => {
            token = service.create(mockData, "3s");
            expect(token).toBeDefined();
        });
    });

    describe("UnhashingToken", () => {
        it("Should be mockData", async () => {
            const data = await service.validateToken(token);
            expect(data).toMatchObject(mockData)
        });
    });
});