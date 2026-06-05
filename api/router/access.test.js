import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import http from "node:http";

vi.mock("../controler/authControler.js", () => ({
  authController: vi.fn(),
  refreshController: vi.fn(),
}));

const { authController, refreshController } = await import("../controler/authControler.js");
const { default: router } = await import("./access.js");

const app = express();
app.use(express.json());
app.use("/", router);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;

const request = (path, options = {}) => fetch(`${baseUrl}${path}`, options);

describe("access router", () => {
  beforeEach(() => vi.clearAllMocks());
  afterAll(() => server.close());

  it("POST /login returns authController result", async () => {
    authController.mockResolvedValue({ success: true, token: "t" });

    const res = await request("/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "a", password: "b" }) });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ success: true, token: "t" });
    expect(authController).toHaveBeenCalledWith("a", "b");
  });

  it("POST /refresh returns refreshController result", async () => {
    refreshController.mockResolvedValue({ success: false, message: "bad" });

    const res = await request("/refresh", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ refreshToken: "x" }) });

    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ success: false, message: "bad" });
    expect(refreshController).toHaveBeenCalledWith("x");
  });
});
