import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Client } from "./client.model.js";

export const Masina = sequelize.define(
  "Masina",
  {
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    an: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nrInmatriculare: {
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

// many-to-one: o masina apartine unui client
Client.hasMany(Masina);
Masina.belongsTo(Client);
