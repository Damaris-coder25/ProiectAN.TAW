import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

vi.mock("jsonwebtoken", () => ({ default: { verify: vi.fn() } }));

const authMiddleware = (await import("./authMiddleware.js")).default;

describe("authMiddleware", () => {
  it("rejects missing or invalid token", () => {
    const req = { headers: {} };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("accepts a valid token", () => {
    jwt.verify.mockReturnValue({ id: 1 });
    const req = { headers: { authorization: "Bearer token" } };
    const res = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1 });
    expect(next).toHaveBeenCalled();
  });
});
