import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/angajat.model.js", () => ({
  Angajat: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    bulkCreate: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
  },
}));

const { Angajat } = await import("../database/entities/angajat.model.js");
const { default: router } = await import("./angajatRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;

const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("angajatRouter", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("GET /get-all and GET /get/:id", async () => {
    Angajat.findAll.mockResolvedValue([{ dataValues: { id: 1, name: "A", rol: "x", telefon: "1" } }]);
    Angajat.findByPk.mockResolvedValue({ dataValues: { id: 1, name: "A", rol: "x", telefon: "1" } });

    await expect(request("/get-all")).resolves.toHaveProperty("status", 200);
    await expect(request("/get/1")).resolves.toHaveProperty("status", 200);
  });

  it("POST /add and /add-many and PUT/DELETE paths", async () => {
    Angajat.create.mockResolvedValue({ dataValues: { id: 2, name: "B", rol: "y", telefon: "2" } });
    Angajat.bulkCreate.mockResolvedValue([{ dataValues: { id: 2, name: "B", rol: "y", telefon: "2" } }]);
    Angajat.update.mockResolvedValue([1]);
    Angajat.destroy.mockResolvedValue(1);

    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "B", rol: "y", telefon: "2" }) });
    await request("/add-many", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ angajati: [{ name: "B", rol: "y", telefon: "2" }] }) });
    await request("/update-name", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, name: "C" }) });
    await request("/update-telefon", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1, telefon: "3" }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });
    await request("/delete-all", { method: "DELETE" });

    expect(Angajat.create).toHaveBeenCalled();
    expect(Angajat.bulkCreate).toHaveBeenCalled();
    expect(Angajat.update).toHaveBeenCalled();
    expect(Angajat.destroy).toHaveBeenCalled();
  });
});
