// tests/integration/booking.test.js
import request from "supertest";
import app from "../../app.js";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/testDb.js";

let customerToken, ownerToken, carId;

beforeAll(async () => await connectTestDB());
afterAll(async () => await closeTestDB());

beforeEach(async () => {
  await clearTestDB();

  const ownerRes = await request(app).post("/api/v1/auth/register").send({
    name: "Owner", email: "owner@test.com", password: "123456", role: "owner",
  });
  ownerToken = ownerRes.body.data.token;

  const customerRes = await request(app).post("/api/v1/auth/register").send({
    name: "Customer", email: "customer@test.com", password: "123456", role: "customer",
  });
  customerToken = customerRes.body.data.token;

  // NOTE: since addCar requires multipart file upload + ImageKit,
  // for pure backend logic tests it's common to create the Car directly
  // via the model instead of going through the HTTP upload endpoint.
  const Car = (await import("../../models/car.model.js")).default;
  const car = await Car.create({
    owner: ownerRes.body.data.user.id,
    brand: "Mercedes", model: "AMG GT", image: "https://placeholder.jpg",
    year: 2023, category: "Luxury", seatCapacity: 2,
    transmission: "Automatic", fuelType: "Petrol",
    pricePerDay: 100, location: "Dallas", description: "Test car",
  });
  carId = car._id.toString();
});

describe("Booking creation & lifecycle", () => {
  it("creates a booking successfully", async () => {
    const res = await request(app)
      .post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        carId, pickupDate: "2026-08-16", returnDate: "2026-08-18", pickupLocation: "Dallas",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe("pending");
    expect(res.body.data.totalPrice).toBe(200); // 2 days * 100
  });

  it("prevents double-booking overlapping dates", async () => {
    await request(app).post("/api/v1/bookings").set("Authorization", `Bearer ${customerToken}`).send({
      carId, pickupDate: "2026-08-16", returnDate: "2026-08-18", pickupLocation: "Dallas",
    });

    const res = await request(app).post("/api/v1/bookings").set("Authorization", `Bearer ${customerToken}`).send({
      carId, pickupDate: "2026-08-17", returnDate: "2026-08-19", pickupLocation: "Dallas",
    });

    expect(res.status).toBe(409);
  });

  it("idempotency key prevents duplicate bookings on retry", async () => {
    const payload = {
      carId, pickupDate: "2026-08-16", returnDate: "2026-08-18", pickupLocation: "Dallas",
    };

    const first = await request(app).post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .set("Idempotency-Key", "test-key-1")
      .send(payload);

    const second = await request(app).post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .set("Idempotency-Key", "test-key-1")
      .send(payload);

    expect(first.body.data._id).toBe(second.body.data._id); // same booking, not duplicated

    const Booking = (await import("../../models/booking.model.js")).default;
    const count = await Booking.countDocuments({});
    expect(count).toBe(1); // only ONE booking actually exists in DB
  });

  it("blocks invalid status transition (confirmed -> completed directly)", async () => {
    const bookingRes = await request(app).post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ carId, pickupDate: "2026-08-16", returnDate: "2026-08-18", pickupLocation: "Dallas" });

    const bookingId = bookingRes.body.data._id;

    await request(app).patch(`/api/v1/bookings/${bookingId}/status`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ status: "confirmed" });

    const res = await request(app).patch(`/api/v1/bookings/${bookingId}/status`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ status: "completed" }); // skipping "ongoing"

    expect(res.status).toBe(400);
  });

  it("customer cannot access another customer's booking", async () => {
    const bookingRes = await request(app).post("/api/v1/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ carId, pickupDate: "2026-08-16", returnDate: "2026-08-18", pickupLocation: "Dallas" });

    const otherCustomerRes = await request(app).post("/api/v1/auth/register").send({
      name: "Other", email: "other@test.com", password: "123456", role: "customer",
    });

    const res = await request(app)
      .get(`/api/v1/bookings/${bookingRes.body.data._id}`)
      .set("Authorization", `Bearer ${otherCustomerRes.body.data.token}`);

    expect(res.status).toBe(403);
  });
});