import { Inject, Injectable } from "@nestjs/common";
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter";
import bcrypt from "bcrypt";

@Injectable()
export class BcryptService implements BcryptAbstractAdapter {
    private readonly salt: number;

    constructor(@Inject("SALT") salt:number = 3){
        this.salt = salt;
    };

    public async hash(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, this.salt);
        return hashPassword;
    };

    public async unHash(password: string, hashPassword: string): Promise<boolean> {
        const isValidate = await bcrypt.compare(password, hashPassword);
        return isValidate;
    };
};