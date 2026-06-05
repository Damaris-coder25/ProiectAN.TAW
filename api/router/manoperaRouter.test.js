import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/manopera.model.js", () => ({
  Manopera: {
    findAll: vi.fn(),
    create: vi.fn(),
    destroy: vi.fn(),
  },
}));

const { Manopera } = await import("../database/entities/manopera.model.js");
const { default: router } = await import("./manoperaRouter.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;
const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("manoperaRouter", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("covers get-all, add and delete", async () => {
    Manopera.findAll.mockResolvedValue([{ dataValues: { id: 1, nume: "x" } }]);
    Manopera.create.mockResolvedValue({ dataValues: { id: 1, nume: "x" } });
    Manopera.destroy.mockResolvedValue(1);

    await request("/get-all");
    await request("/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nume: "x" }) });
    await request("/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: 1 }) });

    expect(Manopera.findAll).toHaveBeenCalled();
    expect(Manopera.create).toHaveBeenCalled();
    expect(Manopera.destroy).toHaveBeenCalled();
  });
});
