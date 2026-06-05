import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/piesa.model.js", () => ({
  Piesa: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    bulkCreate: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  },
}));

const { Piesa } = await import("../database/entities/piesa.model.js");
const { default: router } = await import("./piesaRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("piesaRouter", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("covers piesa routes", async () => {
    Piesa.findAll.mockResolvedValue([{ dataValues: { id: 1, nume: "a", pret: 10, cantitate: 2 } }]);
    Piesa.findByPk.mockResolvedValue({ dataValues: { id: 1, nume: "a", pret: 10, cantitate: 2 } });
    Piesa.create.mockResolvedValue({ dataValues: { id: 1, nume: "a", pret: 10, cantitate: 2 } });
    Piesa.bulkCreate.mockResolvedValue([{ dataValues: { id: 1, nume: "a", pret: 10, cantitate: 2 } }]);
    Piesa.update.mockResolvedValue([1]);
    Piesa.destroy.mockResolvedValue(1);

    await request("/get-all");
    await request("/get/1");
    await request("/get-by-name/a");
    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nume: "a", pret: 10, cantitate: 2 }) });
    await request("/add-many", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ piese: [{ nume: "a", pret: 10, cantitate: 2 }] }) });
    await request("/update-pret", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, pret: 12 }) });
    await request("/update-cantitate", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, cantitate: 3 }) });
    await request("/update-nume", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, nume: "b" }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/delete-all", { method: "DELETE" });

    expect(Piesa.findAll).toHaveBeenCalled();
    expect(Piesa.create).toHaveBeenCalled();
    expect(Piesa.destroy).toHaveBeenCalled();
  });
});
