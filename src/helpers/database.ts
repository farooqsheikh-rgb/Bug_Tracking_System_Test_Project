import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "testproject",
  dialect: (process.env.DB_DIALECT as Dialect) ?? "postgres",
  username: "myuser",
  password: "testproj",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  models: [__dirname + "/models"],
});

export default sequelize;
