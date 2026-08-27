import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/testDb.js";
import Car from "../../models/car.model.js";

let ownerToken, ownerId;

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());

beforeEach(async () => {
  await clearTestDB();

  const ownerRes = await request(app).post("/api/v1/auth/register").send({
    name: "Owner",
    email: "owner@test.com",
    password: "123456",
    role: "owner",
  });
  ownerToken = ownerRes.body.data.token;
  ownerId = ownerRes.body.data.user.id;
});

// helper — creates a car directly via the model, bypassing the
// multipart/ImageKit upload flow, since that's tested separately (manually via Postman)
const createTestCar = async (overrides = {}) => {
  return Car.create({
    owner: ownerId,
    brand: "Mercedes",
    model: "AMG GT",
    image: "https://ik.imagekit.io/test/cars/sample.jpg",
    year: 2023,
    category: "Luxury",
    seatCapacity: 2,
    transmission: "Automatic",
    fuelType: "Petrol",
    pricePerDay: 100,
    location: "Dallas, Texas",
    description: "A powerful luxury sports car.",
    ...overrides,
  });
};

describe("GET /api/v1/cars (public)", () => {
  it("returns an empty list when no cars exist", async () => {
    const res = await request(app).get("/api/v1/cars");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(0);
  });

  it("returns all available cars", async () => {
    await createTestCar();
    await createTestCar({ brand: "Toyota", model: "Corolla", pricePerDay: 40, category: "Sedan" });

    const res = await request(app).get("/api/v1/cars");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(2);
    expect(res.body.data.pagination.total).toBe(2);
  });

  it("filters by location (case-insensitive partial match)", async () => {
    await createTestCar({ location: "Dallas, Texas" });
    await createTestCar({ brand: "Toyota", location: "Austin, Texas" });

    const res = await request(app).get("/api/v1/cars?location=dallas");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(1);
    expect(res.body.data.cars[0].location).toBe("Dallas, Texas");
  });

  it("filters by category", async () => {
    await createTestCar({ category: "Luxury" });
    await createTestCar({ brand: "Toyota", category: "Sedan" });

    const res = await request(app).get("/api/v1/cars?category=Sedan");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(1);
    expect(res.body.data.cars[0].category).toBe("Sedan");
  });

  it("filters by price range", async () => {
    await createTestCar({ pricePerDay: 150 });
    await createTestCar({ brand: "Toyota", pricePerDay: 40 });

    const res = await request(app).get("/api/v1/cars?minPrice=100&maxPrice=200");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(1);
    expect(res.body.data.cars[0].pricePerDay).toBe(150);
  });

  it("paginates results correctly", async () => {
    for (let i = 0; i < 15; i++) {
      await createTestCar({ model: `Model-${i}` });
    }

    const res = await request(app).get("/api/v1/cars?page=2&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(5); // 15 total, page 2 of 10 = remaining 5
    expect(res.body.data.pagination.total).toBe(15);
    expect(res.body.data.pagination.page).toBe(2);
  });

  it("does not return cars marked unavailable", async () => {
    await createTestCar({ isAvailable: false });

    const res = await request(app).get("/api/v1/cars");

    expect(res.body.data.cars).toHaveLength(0);
  });
});

describe("GET /api/v1/cars/:id", () => {
  it("returns a single car with populated owner info", async () => {
    const car = await createTestCar();

    const res = await request(app).get(`/api/v1/cars/${car._id}`);

    expect(res.status).toBe(200);
    expect(res.body.data.brand).toBe("Mercedes");
    expect(res.body.data.owner.name).toBe("Owner");
  });

  it("returns 404 for a valid but non-existent id", async () => {
    const fakeId = "64a1f1c1c1c1c1c1c1c1c1c1";
    const res = await request(app).get(`/api/v1/cars/${fakeId}`);

    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid id format", async () => {
    const res = await request(app).get("/api/v1/cars/not-a-valid-id");

    expect(res.status).toBe(400);
  });
});

describe("GET /api/v1/cars/owner/my-cars", () => {
  it("returns only the logged-in owner's cars", async () => {
    await createTestCar();

    const otherOwnerRes = await request(app).post("/api/v1/auth/register").send({
      name: "Other Owner",
      email: "other-owner@test.com",
      password: "123456",
      role: "owner",
    });

    await Car.create({
      owner: otherOwnerRes.body.data.user.id,
      brand: "BMW",
      model: "M4",
      image: "https://ik.imagekit.io/test/cars/bmw.jpg",
      year: 2022,
      category: "Luxury",
      seatCapacity: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      pricePerDay: 120,
      location: "Austin, Texas",
      description: "Sporty coupe.",
    });

    const res = await request(app)
      .get("/api/v1/cars/owner/my-cars")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.cars).toHaveLength(1);
    expect(res.body.data.cars[0].brand).toBe("Mercedes");
  });

  it("rejects a customer trying to access owner-only route", async () => {
    const customerRes = await request(app).post("/api/v1/auth/register").send({
      name: "Customer",
      email: "customer@test.com",
      password: "123456",
      role: "customer",
    });

    const res = await request(app)
      .get("/api/v1/cars/owner/my-cars")
      .set("Authorization", `Bearer ${customerRes.body.data.token}`);

    expect(res.status).toBe(403);
  });
});

describe("PATCH /api/v1/cars/:id", () => {
  it("allows an owner to update their own car", async () => {
    const car = await createTestCar();

    const res = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ pricePerDay: 175 });

    expect(res.status).toBe(200);
    expect(res.body.data.pricePerDay).toBe(175);
  });

  it("blocks an owner from updating another owner's car", async () => {
    const car = await createTestCar();

    const otherOwnerRes = await request(app).post("/api/v1/auth/register").send({
      name: "Other Owner",
      email: "other-owner@test.com",
      password: "123456",
      role: "owner",
    });

    const res = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set("Authorization", `Bearer ${otherOwnerRes.body.data.token}`)
      .send({ pricePerDay: 999 });

    expect(res.status).toBe(403);
  });
});

describe("DELETE /api/v1/cars/:id", () => {
  it("allows an owner to delete their own car with no active bookings", async () => {
    const car = await createTestCar();

    const res = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);

    const stillExists = await Car.findById(car._id);
    expect(stillExists).toBeNull();
  });
});