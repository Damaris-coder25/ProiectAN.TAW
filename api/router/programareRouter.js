import { Router } from "express";
import { Programare } from "../database/entities/programare.model.js";
import { Factura } from "../database/entities/factura.model.js";
import { Client } from "../database/entities/client.model.js";
import { sequelize } from "../database/db.js";
import { Masina } from "../database/entities/masina.model.js";
const router = Router();

const progs = [];

router.get("/get-all", async (req, res) => {
  progs.length = 0;
  const progsFromDB = await Programare.findAll({
    include: [{ model: Client }, { model: Masina }],
  });
  progsFromDB.forEach((prog) => {
    progs.push({
      id: prog.dataValues.id,
      title: prog.dataValues.title,
      done: Boolean(prog.dataValues.done),
      favorite: Boolean(prog.dataValues.favorite),
      data: prog.dataValues.data,
      client: prog.dataValues.Client,
      masina: prog.dataValues.Masina,
    });
  });
  res.send(progs);
});

router.get("/get/:id", async (req, res) => {
  const prog = await Programare.findByPk(req.params.id, {
    include: [{ model: Client }, { model: Masina }],
  });
  if (!prog) return res.status(404).send({ error: "Programare negasita" });
  res.send(prog.dataValues);
});

router.get("/get-by-client/:clientId", async (req, res) => {
  const clientProgs = await Programare.findAll({
    where: { ClientId: req.params.clientId },
    include: [{ model: Masina }],
  });
  res.send(clientProgs.map((p) => p.dataValues));
});

router.get("/get-done", async (req, res) => {
  const done = await Programare.findAll({ where: { done: true } });
  res.send(done.map((p) => p.dataValues));
});

router.get("/get-favorite", async (req, res) => {
  const favs = await Programare.findAll({ where: { favorite: true } });
  res.send(favs.map((p) => p.dataValues));
});

// POST cu tranzactie - creeaza programare si factura impreuna
router.post("/add", async (req, res) => {
  const { title, ClientId, MasinaId, data, total } = req.body;
  let prog;

  const t = await sequelize.transaction();
  try {
    prog = await Programare.create(
      { title, done: false, favorite: false, data, ClientId, MasinaId },
      { transaction: t },
    );

    await Factura.create(
      { total: total || 0, date: data, ProgramareId: prog.id },
      { transaction: t },
    );

    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error("Eroare la creare programare:", error);
    return res.status(500).send({ error: "Eroare la creare programare" });
  }

  res.send({
    id: prog.dataValues.id,
    title: prog.dataValues.title,
    done: false,
    favorite: false,
    data: prog.dataValues.data,
  });
});

router.post("/add-many", async (req, res) => {
  const progsData = req.body.progs;
  const created = await Programare.bulkCreate(progsData);
  res.send(created.map((p) => p.dataValues));
});

router.put("/update-title", async (req, res) => {
  const { id, newTitle } = req.body;
  await Programare.update({ title: newTitle }, { where: { id } });
  const index = progs.findIndex((p) => p.id === id);
  if (index !== -1) progs[index].title = newTitle;
  res.send({ success: true });
});

router.put("/update-done", async (req, res) => {
  const { id } = req.body;
  const index = progs.findIndex((p) => p.id === id);
  await Programare.update({ done: !progs[index]?.done }, { where: { id } });
  if (index !== -1) progs[index].done = !progs[index].done;
  res.send({ success: true });
});

router.put("/update-favorite", async (req, res) => {
  const { id } = req.body;
  const index = progs.findIndex((p) => p.id === id);
  await Programare.update(
    { favorite: !progs[index]?.favorite },
    { where: { id } },
  );
  if (index !== -1) progs[index].favorite = !progs[index].favorite;
  res.send({ success: true });
});

router.put("/update-data", async (req, res) => {
  const { id, data } = req.body;
  await Programare.update({ data }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-client", async (req, res) => {
  const { id, ClientId } = req.body;
  await Programare.update({ ClientId }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Programare.destroy({ where: { id } });
  progs.splice(
    progs.findIndex((p) => p.id === id),
    1,
  );
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Programare.destroy({ where: {}, truncate: true });
  progs.length = 0;
  res.send({ success: true });
});

export default router;
