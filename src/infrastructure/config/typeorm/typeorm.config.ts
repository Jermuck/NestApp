import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import { UserEntity } from "src/infrastructure/entities/user.entity";

dotenv.config()
export const config:ConnectionOptions = {
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [
        UserEntity 
    ],
    synchronize: true,
};