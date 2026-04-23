import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Angajat = sequelize.define(
  "Angajat",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    telefon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
