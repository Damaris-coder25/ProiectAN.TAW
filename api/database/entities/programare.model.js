import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Client } from "./client.model.js";
import { Angajat } from "./angajat.model.js";
import { Masina } from "./masina.model.js";

export const Programare = sequelize.define(
  "Programare",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    data: {
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

// many-to-one: o programare apartine unui client
Client.hasMany(Programare);
Programare.belongsTo(Client);

// many-to-one: o programare apartine unui angajat
Angajat.hasMany(Programare);
Programare.belongsTo(Angajat);

// many-to-one: o programare apartine unei masini
Masina.hasMany(Programare);
Programare.belongsTo(Masina);
