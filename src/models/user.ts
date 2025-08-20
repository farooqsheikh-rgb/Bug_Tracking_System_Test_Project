import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  NotEmpty,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { UserInterface } from "../interfaces/users";
import Project from "./project";
import ProjectAssignment from "./projectAssignment";
import Bug from "./bug";

@Table({
  tableName: "users",
  timestamps: true,
})
export default class User extends Model implements UserInterface {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.STRING })
  password!: string;

  @Column({ type: DataType.STRING })
  accessToken!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.ENUM("developer", "manager", "QA"),
  })
  user_type!: string;

  @HasMany(() => Project)
  managedProjects!: Project[];

  @BelongsToMany(() => Project, () => ProjectAssignment)
  assignedProjects!: Project[];

  @HasMany(() => Bug, { foreignKey: "qa_id" })
  reportedBugs!: Bug[];

  @HasMany(() => Bug, { foreignKey: "developer_id" })
  assignedBugs!: Bug[];
}
