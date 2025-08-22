import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import User from "../models/user";
import Project from "../models/project";
import ProjectAssignment from "../models/projectMembers";
import Bug from "../models/bug";
import BugAssignment from "../models/bugAssignedDeveloper";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  dialect: process.env.DB_DIALECT! as Dialect,
  models: [User, Project, ProjectAssignment, Bug, BugAssignment],
});

export default sequelize;
