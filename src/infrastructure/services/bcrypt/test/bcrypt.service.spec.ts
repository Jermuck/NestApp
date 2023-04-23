import { Test, TestingModule } from "@nestjs/testing"
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter"
import { BcryptModule } from "../bcrypt.module"
import { BcryptService } from "../bcrypt.service"


describe("BcryptService", () => {
    let service: BcryptService;
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
        service = module.get<BcryptService>(BcryptService);
        console.log(service)
    });

    describe("hashPassword", () => {
        it("Password must ber hash", () => {
            const mockPassword = "test";
            const hashPassword = service.hash(mockPassword);
            expect(hashPassword).toBeDefined();
        })
    })
});
