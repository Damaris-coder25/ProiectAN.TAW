import { sequelize } from "./db.js";

// Import all models so associations are registered before sync
import "./entities/client.model.js";
import "./entities/masina.model.js";
import "./entities/angajat.model.js";
import "./entities/programare.model.js";
import "./entities/factura.model.js";
import "./entities/piesa.model.js";

await sequelize.sync({ alter: true }).then(() => {
  console.log("FINISHED SUCCESS");
  process.exit(0);
});
