import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import User from "./user";
import Bug from "./bug";

@Table({
  tableName: "bug_assignments",
  timestamps: false,
})
export default class BugAssignment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Bug)
  @Column(DataType.INTEGER)
  bug_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;
}
