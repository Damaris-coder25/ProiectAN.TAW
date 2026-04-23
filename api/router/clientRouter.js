import { Router } from "express";
import { Client } from "../database/entities/client.model.js";

const router = Router();

const clients = [];

router.get("/get-all", async (req, res) => {
  clients.length = 0;
  const clientsFromDB = await Client.findAll();
  clientsFromDB.forEach((client) => {
    clients.push({
      id: client.dataValues.id,
      name: client.dataValues.name,
      telefon: client.dataValues.telefon,
      favorite: Boolean(client.dataValues.favorite),
    });
  });
  res.send(clients);
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const client = await Client.findByPk(id);
  if (!client) return res.status(404).send({ error: "Client negasit" });
  res.send(client.dataValues);
});

router.post("/add", async (req, res) => {
  const { name, telefon } = req.body;
  const client = await Client.create({ name, telefon, favorite: false });
  clients.push(client.dataValues);
  res.send(client.dataValues);
});

router.post("/add-many", async (req, res) => {
  const clientsData = req.body.clients;
  const created = await Client.bulkCreate(clientsData);
  res.send(created.map((c) => c.dataValues));
});

router.put("/update-name", async (req, res) => {
  const { id, newName } = req.body;
  await Client.update({ name: newName }, { where: { id } });
  const index = clients.findIndex((c) => c.id === id);
  if (index !== -1) clients[index].name = newName;
  res.send({ success: true });
});

router.put("/toggle-favorite", async (req, res) => {
  const { id } = req.body;
  const client = await Client.findByPk(id);
  if (!client) return res.status(404).send({ error: "Client negasit" });
  await Client.update(
    { favorite: !client.dataValues.favorite },
    { where: { id } },
  );
  res.send({ success: true });
});

router.put("/update-telefon", async (req, res) => {
  const { id, telefon } = req.body;
  await Client.update({ telefon }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Client.destroy({ where: { id } });
  clients.splice(
    clients.findIndex((c) => c.id === id),
    1,
  );
  res.send({ success: true });
});

router.delete("/delete-all", async (req, res) => {
  await Client.destroy({ where: {}, truncate: true });
  clients.length = 0;
  res.send({ success: true });
});

export default router;
