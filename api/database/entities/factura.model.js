import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Programare } from "./programare.model.js";

export const Factura = sequelize.define(
  "Factura",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

// one-to-one: o factura corespunde unei programari
Programare.hasOne(Factura);
Factura.belongsTo(Programare);
