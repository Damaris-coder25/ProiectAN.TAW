import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../database/entities/client.model.js", () => ({
  Client: {
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
    bulkCreate: vi.fn(),
  },
}));

const { Client } = await import("../database/entities/client.model.js");
const { default: clientRouter } = await import("./clientRouter.js");

const app = express();
app.use(express.json());
app.use("/", clientRouter);

const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});

const baseUrl = `http://localhost:${server.address().port}`;

const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("clientRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it("GET /get-all returns the mapped client list", async () => {
    Client.findAll.mockResolvedValue([
      {
        dataValues: {
          id: 1,
          name: "Ion",
          telefon: "0700000000",
          favorite: true,
        },
      },
    ]);

    const res = await request("/get-all");

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual([
      { id: 1, name: "Ion", telefon: "0700000000", favorite: true },
    ]);
    expect(Client.findAll).toHaveBeenCalledOnce();
  });

  it("GET /get/:id returns 404 when the client is missing", async () => {
    Client.findByPk.mockResolvedValue(null);

    const res = await request("/get/999");

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ error: "Client negasit" });
  });

  it("GET /get/:id returns the client when it exists", async () => {
    Client.findByPk.mockResolvedValue({
      dataValues: {
        id: 7,
        name: "Ana",
        telefon: "0722222222",
        favorite: false,
      },
    });

    const res = await request("/get/7");

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      id: 7,
      name: "Ana",
      telefon: "0722222222",
      favorite: false,
    });
  });

  it("POST /add creates a client", async () => {
    Client.create.mockResolvedValue({
      dataValues: {
        id: 2,
        name: "Maria",
        telefon: "0711111111",
        favorite: false,
      },
    });

    const res = await request("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Maria", telefon: "0711111111" }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      id: 2,
      name: "Maria",
      telefon: "0711111111",
      favorite: false,
    });
    expect(Client.create).toHaveBeenCalledWith({
      name: "Maria",
      telefon: "0711111111",
      favorite: false,
    });
  });

  it("POST /add-many creates many clients", async () => {
    const payload = [
      { name: "A", telefon: "0800", favorite: true },
      { name: "B", telefon: "0801", favorite: false },
    ];
    Client.bulkCreate.mockResolvedValue(
      payload.map((item, index) => ({
        dataValues: { id: index + 1, ...item },
      })),
    );

    const res = await request("/add-many", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clients: payload }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual([
      { id: 1, name: "A", telefon: "0800", favorite: true },
      { id: 2, name: "B", telefon: "0801", favorite: false },
    ]);
    expect(Client.bulkCreate).toHaveBeenCalledWith(payload);
  });

  it("PUT /update-name updates the client name", async () => {
    Client.update.mockResolvedValue([1]);

    const res = await request("/update-name", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, newName: "Gheorghe" }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(Client.update).toHaveBeenCalledWith(
      { name: "Gheorghe" },
      { where: { id: 1 } },
    );
  });

  it("PUT /toggle-favorite returns 404 when the client does not exist", async () => {
    Client.findByPk.mockResolvedValue(null);

    const res = await request("/toggle-favorite", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 10 }),
    });

    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toEqual({ error: "Client negasit" });
  });

  it("PUT /toggle-favorite flips favorite status", async () => {
    Client.findByPk.mockResolvedValue({
      dataValues: { id: 4, favorite: false },
    });
    Client.update.mockResolvedValue([1]);

    const res = await request("/toggle-favorite", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 4 }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(Client.update).toHaveBeenCalledWith(
      { favorite: true },
      { where: { id: 4 } },
    );
  });

  it("PUT /update-telefon updates the phone number", async () => {
    Client.update.mockResolvedValue([1]);

    const res = await request("/update-telefon", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 5, telefon: "0744444444" }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(Client.update).toHaveBeenCalledWith(
      { telefon: "0744444444" },
      { where: { id: 5 } },
    );
  });

  it("DELETE /delete removes a client", async () => {
    Client.destroy.mockResolvedValue(1);

    const res = await request("/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 6 }),
    });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(Client.destroy).toHaveBeenCalledWith({ where: { id: 6 } });
  });

  it("DELETE /delete-all clears every client", async () => {
    Client.destroy.mockResolvedValue(1);

    const res = await request("/delete-all", { method: "DELETE" });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true });
    expect(Client.destroy).toHaveBeenCalledWith({ where: {}, truncate: true });
  });
});
