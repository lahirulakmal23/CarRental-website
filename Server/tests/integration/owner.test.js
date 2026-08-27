import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/testDb.js";
import Car from "../../models/car.model.js";
import Booking from "../../models/booking.model.js";
import User from "../../models/user.model.js";

let ownerToken, ownerId, customerToken, customerId;

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());

beforeEach(async () => {
  await clearTestDB();

  const ownerRes = await request(app).post("/api/v1/auth/register").send({
    name: "Owner",
    email: "owner@test.com",
    password: "123456",
    role: "customer", // registers as customer first, then upgrades — mirrors real flow
  });
  ownerToken = ownerRes.body.data.token;
  ownerId = ownerRes.body.data.user.id;

  const customerRes = await request(app).post("/api/v1/auth/register").send({
    name: "Customer",
    email: "customer@test.com",
    password: "123456",
    role: "customer",
  });
  customerToken = customerRes.body.data.token;
  customerId = customerRes.body.data.user.id;
});

describe("POST /api/v1/owner/change-role", () => {
  it("upgrades a customer to owner role", async () => {
    const res = await request(app)
      .post("/api/v1/owner/change-role")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.role).toBe("owner");

    const updatedUser = await User.findById(ownerId);
    expect(updatedUser.role).toBe("owner");
  });

  it("rejects trying to change role twice", async () => {
    await request(app)
      .post("/api/v1/owner/change-role")
      .set("Authorization", `Bearer ${ownerToken}`);

    const res = await request(app)
      .post("/api/v1/owner/change-role")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(400);
  });

  it("requires authentication", async () => {
    const res = await request(app).post("/api/v1/owner/change-role");
    expect(res.status).toBe(401);
  });
});

// NOTE: POST /owner/add-car requires multipart file upload + a live ImageKit call,
// which isn't practical to fully automate here — that flow is verified manually via Postman.
// These tests cover the parts of the module that are pure DB/business logic instead.

describe("GET /api/v1/owner/dashboard", () => {
  const createCarForOwner = async (overrides = {}) => {
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
      description: "Test car.",
      ...overrides,
    });
  };

  beforeEach(async () => {
    // promote the "owner" test user to actual owner role before dashboard tests
    await request(app)
      .post("/api/v1/owner/change-role")
      .set("Authorization", `Bearer ${ownerToken}`);
  });

  it("returns zeroed stats for an owner with no cars or bookings", async () => {
    const res = await request(app)
      .get("/api/v1/owner/dashboard")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.totalCars).toBe(0);
    expect(res.body.data.totalBookings).toBe(0);
    expect(res.body.data.totalIncome).toBe(0);
  });

  it("correctly counts cars and bookings by status, and sums income only from completed bookings", async () => {
    const car = await createCarForOwner();

    // completed booking — should count toward income
    await Booking.create({
      customer: customerId,
      car: car._id,
      owner: ownerId,
      pickupDate: "2026-08-01",
      returnDate: "2026-08-03",
      totalPrice: 200,
      status: "completed",
      pickupLocation: "Dallas",
    });

    // pending booking — should NOT count toward income
    await Booking.create({
      customer: customerId,
      car: car._id,
      owner: ownerId,
      pickupDate: "2026-09-01",
      returnDate: "2026-09-02",
      totalPrice: 100,
      status: "pending",
      pickupLocation: "Dallas",
    });

    const res = await request(app)
      .get("/api/v1/owner/dashboard")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.totalCars).toBe(1);
    expect(res.body.data.totalBookings).toBe(2);
    expect(res.body.data.completedBookings).toBe(1);
    expect(res.body.data.totalIncome).toBe(200); // only the completed booking's price
    expect(res.body.data.bookingsByStatus.pending).toBe(1);
    expect(res.body.data.bookingsByStatus.completed).toBe(1);
  });

  it("only counts this owner's own cars and bookings, not other owners'", async () => {
    await createCarForOwner();

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
      description: "Another owner's car.",
    });

    const res = await request(app)
      .get("/api/v1/owner/dashboard")
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.body.data.totalCars).toBe(1); // not 2 — only this owner's car
  });

  it("rejects a customer trying to access the owner dashboard", async () => {
    const res = await request(app)
      .get("/api/v1/owner/dashboard")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(403);
  });

  it("requires authentication", async () => {
    const res = await request(app).get("/api/v1/owner/dashboard");
    expect(res.status).toBe(401);
  });
});