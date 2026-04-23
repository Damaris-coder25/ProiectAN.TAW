import { Router } from "express";
import { Manopera } from "../database/entities/manopera.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const manopere = await Manopera.findAll();
  res.send(manopere.map((m) => m.dataValues));
});

router.post("/add", async (req, res) => {
  const { nume } = req.body;
  const manopera = await Manopera.create({ nume });
  res.send(manopera.dataValues);
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Manopera.destroy({ where: { id } });
  res.send({ success: true });
});

export default router;
