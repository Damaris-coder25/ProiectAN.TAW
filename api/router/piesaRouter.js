import { Router } from "express";
import { Piesa } from "../database/entities/piesa.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const piese = await Piesa.findAll();
  res.send(piese.map((p) => p.dataValues));
});

router.get("/get/:id", async (req, res) => {
  const piesa = await Piesa.findByPk(req.params.id);
  if (!piesa) return res.status(404).send({ error: "Piesa negasita" });
  res.send(piesa.dataValues);
});

router.get("/get-by-name/:nume", async (req, res) => {
  const piese = await Piesa.findAll({ where: { nume: req.params.nume } });
  res.send(piese.map((p) => p.dataValues));
});

router.post("/add", async (req, res) => {
  const { nume, pret, cantitate } = req.body;
  const piesa = await Piesa.create({ nume, pret, cantitate });
  res.send(piesa.dataValues);
});

router.post("/add-many", async (req, res) => {
  const pieseData = req.body.piese;
  const created = await Piesa.bulkCreate(pieseData);
  res.send(created.map((p) => p.dataValues));
});

router.put("/update-pret", async (req, res) => {
  const { id, pret } = req.body;
  await Piesa.update({ pret }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-cantitate", async (req, res) => {
  const { id, cantitate } = req.body;
  await Piesa.update({ cantitate }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-nume", async (req, res) => {
  const { id, nume } = req.body;
  await Piesa.update({ nume }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Piesa.destroy({ where: { id } });
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Piesa.destroy({ where: {}, truncate: true });
  res.send({ success: true });
});

export default router;
