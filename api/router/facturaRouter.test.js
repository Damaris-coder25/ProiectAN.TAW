import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/factura.model.js", () => ({
  Factura: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    bulkCreate: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  },
}));
vi.mock("../database/entities/programare.model.js", () => ({
  Programare: {},
}));

const { Factura } = await import("../database/entities/factura.model.js");
const { default: router } = await import("./facturaRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("facturaRouter", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("covers factura routes", async () => {
    Factura.findAll.mockResolvedValue([{ dataValues: { id: 1, title: "t", total: 10, date: "2024-01-01", Programare: { id: 7 } } }]);
    Factura.findByPk.mockResolvedValue({ dataValues: { id: 1, title: "t", total: 10, date: "2024-01-01", Programare: { id: 7 } } });
    Factura.findOne.mockResolvedValue({ dataValues: { id: 1, title: "t", total: 10, date: "2024-01-01" } });
    Factura.create.mockResolvedValue({ dataValues: { id: 1, total: 10, date: "2024-01-01", ProgramareId: 7 } });
    Factura.bulkCreate.mockResolvedValue([{ dataValues: { id: 1, total: 10, date: "2024-01-01", ProgramareId: 7 } }]);
    Factura.update.mockResolvedValue([1]);
    Factura.destroy.mockResolvedValue(1);

    await request("/get-all");
    await request("/get/1");
    await request("/get-by-programare/7");
    await request("/get-by-date/2024-01-01");
    await request("/get-total");
    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ total: 10, date: "2024-01-01", ProgramareId: 7 }) });
    await request("/add-many", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ facturi: [{ total: 10, date: "2024-01-01", ProgramareId: 7 }] }) });
    await request("/update-total", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, total: 20, title: "u" }) });
    await request("/update-date", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, date: "2024-02-01" }) });
    await request("/update-programare", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, ProgramareId: 8 }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/delete-all", { method: "DELETE" });

    expect(Factura.findAll).toHaveBeenCalled();
    expect(Factura.create).toHaveBeenCalled();
    expect(Factura.destroy).toHaveBeenCalled();
  });
});
