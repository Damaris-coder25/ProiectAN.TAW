import { sequelize } from "./db.js";
import "./entities/client.model.js";
import "./entities/masina.model.js";
import "./entities/angajat.model.js";
import "./entities/programare.model.js";
import "./entities/factura.model.js";
import "./entities/piesa.model.js";
import "./entities/manopera.model.js";
import "./entities/user.model.js";
import bcrypt from "bcryptjs";
import { User } from "./entities/user.model.js";

await sequelize.sync({ alter: true }).then(async () => {
  const passwordHash = await bcrypt.hash("admin123", 10);
  await User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      username: "admin",
      password: passwordHash,
    },
  });
  console.log("FINISHED SUCCESS");
  process.exit(0);
});
