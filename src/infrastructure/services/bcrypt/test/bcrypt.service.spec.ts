import { Test, TestingModule } from "@nestjs/testing"
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter"
import { BcryptService } from "../bcrypt.service"

describe("BcryptService", () => {
    let service: BcryptAbstractAdapter;
    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers:[
                {
                    useValue:3,
                    provide:"SALT",
                },
                BcryptService
            ]
        }).compile();
        service = module.get<BcryptAbstractAdapter>(BcryptService);
    });

    describe("hashPassword", () => {
        it("Password must ber hash", async () => {
            const mockPassword = "test";
            const hashPassword = await service.hash(mockPassword);
            const validate = await service.unHash(mockPassword, hashPassword);
            expect(validate).toBeTruthy();
            expect(hashPassword).toBeDefined();
        });
    });
});
