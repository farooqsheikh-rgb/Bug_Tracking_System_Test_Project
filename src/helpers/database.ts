import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import User from '../models/user'; 
import Project from "../models/project";
import ProjectAssignment from "../models/projectAssignment";
import Bug from "../models/bug";

const sequelize = new Sequelize({
  database: "testproject",
  dialect: (process.env.DB_DIALECT as Dialect) ?? "postgres",
  username: "myuser",
  password: "testproj",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  models: [User,Project,ProjectAssignment,Bug],
});

export default sequelize;
