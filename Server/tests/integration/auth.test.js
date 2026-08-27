// tests/integration/auth.test.js
import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/testDb.js";

beforeAll(async () => await connectTestDB());
afterEach(async () => await clearTestDB());
afterAll(async () => await closeTestDB());

describe("POST /api/v1/auth/register", () => {
  it("registers a new customer successfully", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "John",
      email: "john@test.com",
      password: "123456",
      role: "customer",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe("customer");
    expect(res.body.data.token).toBeDefined();
  });

  it("rejects duplicate email with 409", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "John", email: "john@test.com", password: "123456", role: "customer",
    });

    const res = await request(app).post("/api/v1/auth/register").send({
      name: "John2", email: "john@test.com", password: "654321", role: "customer",
    });

    expect(res.status).toBe(409);
  });

  it("blocks self-registration as admin", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Hacker", email: "hacker@test.com", password: "123456", role: "admin",
    });

    expect(res.status).toBe(400); // validator should reject "admin" as a role value
  });
});

describe("POST /api/v1/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "John", email: "john@test.com", password: "123456", role: "customer",
    });
  });

  it("logs in with correct credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "john@test.com", password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it("rejects wrong password with 401", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "john@test.com", password: "wrongpass",
    });
    expect(res.status).toBe(401);
  });
});