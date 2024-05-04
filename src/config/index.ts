import * as dotenv from "dotenv";
import * as sequelize from "sequelize";

dotenv.config();

const mustExist = <T>(value: T | undefined, name: string): T => {
  if (!value) {
    console.error(`Missing config: ${name}`);
    process.exit(1);
  }
  return value;
};

export const port = mustExist(+process.env.PORT! as number, "PORT"),
  db = {
    username: mustExist(process.env.DB_USER!, "DB_USER"),
    password: mustExist(process.env.DB_PASSWORD!, "DB_PASSWORD"),
    name: mustExist(process.env.DB_NAME!, "DB_NAME"),
    host: mustExist(process.env.DB_HOST!, "DB_HOST"),
    dialect: mustExist(process.env.DB_DIALECT!, "DB_DIALECT"),
    port: mustExist(+process.env.DB_PORT!, "DB_PORT"),
    logging: false,
    timezone: "utc",
  } as {
    username: string;
    password: string;
    name: string;
    host: string;
    dialect: sequelize.Dialect;
    port: number;
    logging: boolean;
    timezone: string;
  },
  hostUrl = mustExist(process.env.HOST_URL!, "HOST_URL");

export * from "./instance";
