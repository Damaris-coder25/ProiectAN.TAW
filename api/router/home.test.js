import { afterAll, describe, expect, it } from "vitest";
import express from "express";
import http from "node:http";
import homeRouter from "./home.js";

const app = express();
app.use("/", homeRouter);
const server = await new Promise((resolve) => {
  const s = http.createServer(app);
  s.listen(0, () => resolve(s));
});
const baseUrl = `http://localhost:${server.address().port}`;

describe("home router", () => {
  it("GET /hello returns hello world", async () => {
    const res = await fetch(`${baseUrl}/hello`);
    expect(res.status).toBe(200);
    await expect(res.text()).resolves.toBe("Hello World!");
  });

  afterAll(() => server.close());
});
