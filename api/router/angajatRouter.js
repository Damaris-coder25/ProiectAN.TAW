import { Router } from "express";
import { Angajat } from "../database/entities/angajat.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const angajati = await Angajat.findAll();
  res.send(angajati.map((a) => a.dataValues));
});

router.get("/get/:id", async (req, res) => {
  const angajat = await Angajat.findByPk(req.params.id);
  if (!angajat) return res.status(404).send({ error: "Angajat negasit" });
  res.send(angajat.dataValues);
});

router.get("/get-by-rol/:rol", async (req, res) => {
  const angajati = await Angajat.findAll({ where: { rol: req.params.rol } });
  res.send(angajati.map((a) => a.dataValues));
});

router.post("/add", async (req, res) => {
  const { name, rol, telefon } = req.body;
  const angajat = await Angajat.create({ name, rol, telefon });
  res.send(angajat.dataValues);
});

router.post("/add-many", async (req, res) => {
  const angajatiData = req.body.angajati;
  const created = await Angajat.bulkCreate(angajatiData);
  res.send(created.map((a) => a.dataValues));
});

router.put("/update-name", async (req, res) => {
  const { id, name } = req.body;
  await Angajat.update({ name }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-rol", async (req, res) => {
  const { id, rol } = req.body;
  await Angajat.update({ rol }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-telefon", async (req, res) => {
  const { id, telefon } = req.body;
  await Angajat.update({ telefon }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Angajat.destroy({ where: { id } });
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Angajat.destroy({ where: {}, truncate: true });
  res.send({ success: true });
});

export default router;
