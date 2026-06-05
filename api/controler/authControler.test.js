import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("bcryptjs", () => ({ default: { compare: vi.fn() } }));
vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn((payload) =>
      payload.type === "refresh" ? `refresh:${payload.id}` : `access:${payload.id}`,
    ),
    verify: vi.fn(),
  },
}));
vi.mock("../database/entities/user.model.js", () => ({ User: { findOne: vi.fn(), findByPk: vi.fn() } }));

const bcrypt = await import("bcryptjs");
const jwt = await import("jsonwebtoken");
const { User } = await import("../database/entities/user.model.js");
const { authController, refreshController } = await import("./authControler.js");

describe("authController", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns validation errors for missing credentials", async () => {
    await expect(authController("", "")).resolves.toEqual({ success: false, message: "Username and password are required" });
  });

  it("returns invalid credentials for unknown user", async () => {
    User.findOne.mockResolvedValue(null);
    await expect(authController("user", "pass")).resolves.toEqual({ success: false, message: "Invalid credentials" });
  });

  it("returns a token for valid credentials", async () => {
    User.findOne.mockResolvedValue({ dataValues: { id: 1, username: "u", password: "hash" } });
    bcrypt.default.compare.mockResolvedValue(true);

    await expect(authController("u", "p")).resolves.toEqual({ success: true, token: "access:1", refreshToken: "refresh:1" });
  });

  it("handles refresh token flow", async () => {
    jwt.default.verify.mockReturnValue({ id: 2, type: "refresh" });
    User.findByPk.mockResolvedValue({ dataValues: { id: 2, username: "u", password: "hash" } });

    await expect(refreshController("good-token")).resolves.toEqual({ success: true, token: "access:2", refreshToken: "refresh:2" });
  });

  it("rejects invalid refresh tokens", async () => {
    jwt.default.verify.mockImplementation(() => { throw new Error("bad"); });
    await expect(refreshController("bad")).resolves.toEqual({ success: false, message: "Invalid refresh token" });
  });
});
