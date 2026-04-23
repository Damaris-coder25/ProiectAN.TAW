import { Router } from "express";
import { Masina } from "../database/entities/masina.model.js";
import { Client } from "../database/entities/client.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const masini = await Masina.findAll({
    include: [{ model: Client }],
  });
  res.send(
    masini.map((m) => ({
      id: m.dataValues.id,
      marca: m.dataValues.marca,
      model: m.dataValues.model,
      an: m.dataValues.an,
      nrInmatriculare: m.dataValues.nrInmatriculare,
      client: m.dataValues.Client,
    })),
  );
});

router.get("/get/:id", async (req, res) => {
  const masina = await Masina.findByPk(req.params.id, {
    include: [{ model: Client }],
  });
  if (!masina) return res.status(404).send({ error: "Masina negasita" });
  res.send(masina.dataValues);
});

router.get("/get-by-client/:clientId", async (req, res) => {
  const masini = await Masina.findAll({
    where: { ClientId: req.params.clientId },
  });
  res.send(masini.map((m) => m.dataValues));
});

router.get("/get-by-marca/:marca", async (req, res) => {
  const masini = await Masina.findAll({ where: { marca: req.params.marca } });
  res.send(masini.map((m) => m.dataValues));
});

router.post("/add", async (req, res) => {
  const { marca, model, an, nrInmatriculare, ClientId } = req.body;
  const masina = await Masina.create({
    marca,
    model,
    an,
    nrInmatriculare,
    ClientId,
  });
  res.send(masina.dataValues);
});

router.post("/add-many", async (req, res) => {
  const masiniData = req.body.masini;
  const created = await Masina.bulkCreate(masiniData);
  res.send(created.map((m) => m.dataValues));
});

router.put("/update-nr", async (req, res) => {
  const { id, nrInmatriculare } = req.body;
  await Masina.update({ nrInmatriculare }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-model", async (req, res) => {
  const { id, model } = req.body;
  await Masina.update({ model }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-client", async (req, res) => {
  const { id, ClientId } = req.body;
  await Masina.update({ ClientId }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Masina.destroy({ where: { id } });
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Masina.destroy({ where: {}, truncate: true });
  res.send({ success: true });
});

export default router;
