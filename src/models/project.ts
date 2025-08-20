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
  HasMany,
} from "sequelize-typescript";
import ProjectAssignment from "./projectAssignment";
import User from "./user";
import Bug from "./bug";

@Table({
  tableName: "projects",
  timestamps: true,
})
export default class Project extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.STRING })
  name!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  manager_id!: number;

  @BelongsTo(() => User, { as: "manager" })
  manager!: User;

  @BelongsToMany(() => User, () => ProjectAssignment)
  assignedUsers!: User[];

  @HasMany(() => Bug)
  bugs!: Bug[];
}
