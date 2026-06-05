import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/programare.model.js", () => ({
  Programare: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    bulkCreate: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  },
}));
vi.mock("../database/entities/factura.model.js", () => ({
  Factura: { create: vi.fn() },
}));
vi.mock("../database/db.js", () => ({
  sequelize: { transaction: vi.fn() },
}));
vi.mock("../database/entities/client.model.js", () => ({ Client: {} }));
vi.mock("../database/entities/masina.model.js", () => ({ Masina: {} }));

const { Programare } = await import("../database/entities/programare.model.js");
const { Factura } = await import("../database/entities/factura.model.js");
const { sequelize } = await import("../database/db.js");
const { default: router } = await import("./programareRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("programareRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sequelize.transaction.mockResolvedValue({ commit: vi.fn(), rollback: vi.fn() });
  });
  afterAll(() => server.close());

  it("covers programare routes", async () => {
    Programare.findAll.mockResolvedValue([{ dataValues: { id: 1, title: "t", done: true, favorite: true, data: "2024-01-01", manopereSelectate: [1], Client: {}, Masina: {} } }]);
    Programare.findByPk.mockResolvedValue({ dataValues: { id: 1, title: "t", done: true, favorite: true, data: "2024-01-01", manopereSelectate: [1], Client: {}, Masina: {} } });
    Programare.create.mockResolvedValue({ dataValues: { id: 10, title: "t", done: false, favorite: false, data: "2024-01-01", manopereSelectate: [1] } });
    Programare.bulkCreate.mockResolvedValue([{ dataValues: { id: 1, title: "t" } }]);
    Programare.update.mockResolvedValue([1]);
    Programare.destroy.mockResolvedValue(1);
    Factura.create.mockResolvedValue({});

    await request("/get-all");
    await request("/get/1");
    await request("/get-by-client/1");
    await request("/get-done");
    await request("/get-favorite");
    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "t", ClientId: 1, MasinaId: 2, data: "2024-01-01", total: 10, manopereSelectate: [1] }) });
    await request("/add-many", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ progs: [{ title: "t" }] }) });
    await request("/update-title", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, newTitle: "u" }) });
    await request("/update-manopere", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, manopereSelectate: [2] }) });
    await request("/update-done", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/update-favorite", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/update-data", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, data: "2024-02-01" }) });
    await request("/update-client", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, ClientId: 9 }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/delete-all", { method: "DELETE" });

    expect(Programare.findAll).toHaveBeenCalled();
    expect(Programare.create).toHaveBeenCalled();
    expect(Programare.destroy).toHaveBeenCalled();
  });
});
