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
import User from "./user";
import Bug from "./bug";
import ProjectMembers from "./projectMembers";

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

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.STRING })
  description!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  manager_id!: number;

  @BelongsTo(() => User)
  manager!: User;

  @BelongsToMany(() => User, () => ProjectMembers)
  assignedUsers!: User[];

  @HasMany(() => Bug)
  bugs!: Bug[];
}
