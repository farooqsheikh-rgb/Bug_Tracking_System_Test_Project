import { DataTypes,Sequelize } from "sequelize";
import type { Migration } from "../../umzug";
import sequelize from "../../helpers/database";

export const up:Migration=async({context:sequelize})=>{
    await sequelize.getQueryInterface().createTable("users",{
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.ENUM("developer", "manager", "QA"),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
};

export const down:Migration = async ({ context: sequelize}) => {
    await sequelize.getQueryInterface().dropTable("users");
}