import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Project from "./project";
import User from "./user";

@Table({
  tableName: "project_assignments",
  timestamps: false,
})
export default class ProjectAssignment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Project)
  @Column(DataType.INTEGER)
  project_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;
}
