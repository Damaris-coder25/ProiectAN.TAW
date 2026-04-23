import express from "express";
import bodyParser from "body-parser";

import accessRouter from "./router/access.js";
import clientRouter from "./router/clientRouter.js";
import programareRouter from "./router/programareRouter.js";
import facturaRouter from "./router/facturaRouter.js";
import angajatRouter from "./router/angajatRouter.js";
import masinaRouter from "./router/masinaRouter.js";
import piesaRouter from "./router/piesaRouter.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/access", accessRouter);
app.use("/client", clientRouter);
app.use("/programare", programareRouter);
app.use("/factura", facturaRouter);
app.use("/angajat", angajatRouter);
app.use("/masina", masinaRouter);
app.use("/piesa", piesaRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
