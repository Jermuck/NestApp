import { config } from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

config();
export const DBconfig:TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [
        __dirname + "./../../entities/*.entity.{js, ts}"
    ],
    synchronize: true,
};
