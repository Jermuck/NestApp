import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config()
export const config:ConnectionOptions = {
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [],
    synchronize: true,
};