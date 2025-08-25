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
import Bug from "./bug";
import BugAssignedDeveloper from "./bugAssignedDeveloper";
import ProjectMembers from "./projectMembers";

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

  @BelongsToMany(() => Project, () => ProjectMembers)
  assignedProjects!: Project[];

  @HasMany(() => Bug, "user_id")
  reportedBugs!: Bug[];

  // @BelongsToMany(() => Bug, () => BugAssignedDeveloper)
  // developerAssignedBugs!: Bug[];

  @BelongsToMany(() => Bug, {
    through: () => BugAssignedDeveloper,
    as: "developerAssignedBugs",
  })
  developerAssignedBugs!: Bug[];
}
