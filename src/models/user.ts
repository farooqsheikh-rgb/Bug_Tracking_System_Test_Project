import { Table,Column,Model,DataType,HasAssociation, PrimaryKey, AutoIncrement, AllowNull, NotEmpty } from "sequelize-typescript";
import { UserInterface } from "../interfaces/users";

@Table({
    tableName: "users",
    timestamps: true
})

export default class User extends Model implements UserInterface{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number
    
    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.ENUM('manager','qa','developer')
    })
    user_type!: string
}