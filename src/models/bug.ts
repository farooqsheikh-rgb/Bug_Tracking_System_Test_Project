import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  NotEmpty,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import Project from "./project";
import User from "./user";
import BugAssignedDeveloper from "./bugAssignedDeveloper";

@Table({
  tableName: "bugs",
  timestamps: true,
})
export default class Bug extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.DATE)
  deadline?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  screenshot?: string;

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.ENUM("feature", "bug"),
  })
  type!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.STRING,
  })
  status!: string;

  @ForeignKey(() => Project)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  project_id!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User, "user_id")
  qa!: User;

  // @BelongsToMany(() => User, () => BugAssignedDeveloper)
  // assignedDeveloper!: User;

  @BelongsToMany(() => User, {
    through: () => BugAssignedDeveloper,
    as: "assignedDevelopers",
  })
  assignedDevelopers!: User[];
}
