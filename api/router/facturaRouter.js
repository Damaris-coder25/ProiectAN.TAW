import { Router } from "express";
import { Factura } from "../database/entities/factura.model.js";
import { Programare } from "../database/entities/programare.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const facturi = await Factura.findAll({
    include: [{ model: Programare, paranoid: false }],
  });
  res.send(
    facturi.map((f) => ({
      id: f.dataValues.id,
      title: f.dataValues.title,
      total: f.dataValues.total,
      date: f.dataValues.date,
      programare: f.dataValues.Programare,
    })),
  );
});

router.get("/get/:id", async (req, res) => {
  const factura = await Factura.findByPk(req.params.id, {
    include: [{ model: Programare }],
  });
  if (!factura) return res.status(404).send({ error: "Factura negasita" });
  res.send(factura.dataValues);
});

router.get("/get-by-programare/:programareId", async (req, res) => {
  const factura = await Factura.findOne({
    where: { ProgramareId: req.params.programareId },
  });
  if (!factura) return res.status(404).send({ error: "Factura negasita" });
  res.send(factura.dataValues);
});

router.get("/get-by-date/:date", async (req, res) => {
  const facturi = await Factura.findAll({
    where: { date: req.params.date },
  });
  res.send(facturi.map((f) => f.dataValues));
});

router.get("/get-total", async (req, res) => {
  const facturi = await Factura.findAll();
  const total = facturi.reduce((sum, f) => sum + f.dataValues.total, 0);
  res.send({ total });
});

router.post("/add", async (req, res) => {
  const { total, date, ProgramareId } = req.body;
  const factura = await Factura.create({ total, date, ProgramareId });
  res.send(factura.dataValues);
});

router.post("/add-many", async (req, res) => {
  const facturiData = req.body.facturi;
  const created = await Factura.bulkCreate(facturiData);
  res.send(created.map((f) => f.dataValues));
});

router.put("/update-total", async (req, res) => {
  const { id, total, title } = req.body;
  const fields = { total };
  if (title !== undefined) fields.title = title;
  await Factura.update(fields, { where: { id } });
  res.send({ success: true });
});

router.put("/update-date", async (req, res) => {
  const { id, date } = req.body;
  await Factura.update({ date }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-programare", async (req, res) => {
  const { id, ProgramareId } = req.body;
  await Factura.update({ ProgramareId }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Factura.destroy({ where: { id } });
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Factura.destroy({ where: {}, truncate: true });
  res.send({ success: true });
});

export default router;
