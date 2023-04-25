import { ConnectionOptions } from "typeorm";
import { config } from "dotenv";

config();
export const DBconfig:ConnectionOptions = {
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