import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/masina.model.js", () => ({
  Masina: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    bulkCreate: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  },
}));
vi.mock("../database/entities/client.model.js", () => ({
  Client: {},
}));

const { Masina } = await import("../database/entities/masina.model.js");
const { default: router } = await import("./masinaRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("masinaRouter", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("covers masina routes", async () => {
    Masina.findAll.mockResolvedValue([{ dataValues: { id: 1, marca: "a", model: "b", an: 2024, nrInmatriculare: "x", Client: { id: 5 } } }]);
    Masina.findByPk.mockResolvedValue({ dataValues: { id: 1, marca: "a", model: "b", an: 2024, nrInmatriculare: "x", Client: { id: 5 } } });
    Masina.create.mockResolvedValue({ dataValues: { id: 1, marca: "a", model: "b", an: 2024, nrInmatriculare: "x", ClientId: 5 } });
    Masina.bulkCreate.mockResolvedValue([{ dataValues: { id: 1, marca: "a", model: "b", an: 2024, nrInmatriculare: "x", ClientId: 5 } }]);
    Masina.update.mockResolvedValue([1]);
    Masina.destroy.mockResolvedValue(1);

    await request("/get-all");
    await request("/get/1");
    await request("/get-by-client/5");
    await request("/get-by-marca/a");
    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ marca: "a", model: "b", an: 2024, nrInmatriculare: "x", ClientId: 5 }) });
    await request("/add-many", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ masini: [{ marca: "a", model: "b", an: 2024, nrInmatriculare: "x", ClientId: 5 }] }) });
    await request("/update-nr", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, nrInmatriculare: "y" }) });
    await request("/update-model", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, model: "c" }) });
    await request("/update-client", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, ClientId: 6 }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/delete-all", { method: "DELETE" });

    expect(Masina.findAll).toHaveBeenCalled();
    expect(Masina.create).toHaveBeenCalled();
    expect(Masina.destroy).toHaveBeenCalled();
  });
});
