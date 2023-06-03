import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config({ path: "./env/.env" });
const config = new DataSource({
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  type: "postgres",
  entities: [
    __dirname + "./../entities/*.entity{.ts, .js}"
  ],
  migrations: [
    __dirname + "./../../migrations/*{.ts, .js}"
  ],
});
export default config;
