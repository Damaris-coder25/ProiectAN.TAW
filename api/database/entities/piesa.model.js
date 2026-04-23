import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Piesa = sequelize.define(
  "Piesa",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    pret: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantitate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
