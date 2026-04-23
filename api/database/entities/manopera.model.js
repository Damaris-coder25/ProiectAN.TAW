import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Manopera = sequelize.define(
  "Manopera",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
