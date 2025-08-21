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
import BugAssignment from "./bugAssignment";

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
    validate: {
      is: /.*\.(png|gif)$/i,
    },
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
  qa_id!: number;

  @BelongsTo(() => User, { as: "QA" })
  qa!: User;

  @BelongsToMany(() => User, () => BugAssignment)
  assignedDevelopers!: User;
}
