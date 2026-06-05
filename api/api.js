import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware.js";
import accessRouter from "./router/access.js";
import clientRouter from "./router/clientRouter.js";
import programareRouter from "./router/programareRouter.js";
import facturaRouter from "./router/facturaRouter.js";
import angajatRouter from "./router/angajatRouter.js";
import masinaRouter from "./router/masinaRouter.js";
import piesaRouter from "./router/piesaRouter.js";
import manoperaRouter from "./router/manoperaRouter.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/access", accessRouter);
app.use("/client", authMiddleware, clientRouter);
app.use("/programare", authMiddleware, programareRouter);
app.use("/factura", authMiddleware, facturaRouter);
app.use("/angajat", authMiddleware, angajatRouter);
app.use("/masina", authMiddleware, masinaRouter);
app.use("/piesa", authMiddleware, piesaRouter);
app.use("/manopera", authMiddleware, manoperaRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
