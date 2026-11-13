import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.model.js";
import Car from "../../models/car.model.js";
import Booking from "../../models/booking.model.js";
import { generateToken } from "../../services/token.services.js";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/testDb.js";

let customer, owner, otherCustomer, car;
beforeAll(async () => { await connectTestDB(); }, 60000);
afterAll(async () => { await closeTestDB(); });
beforeEach(async () => {
  await clearTestDB();
  const createAccount = async (name, role) => {
    const response = await request(app).post("/api/v1/auth/register").send({ name, email: `${name}@test.com`, password: "test123456", role });
    expect(response.status).toBe(201);
    return response.body.data;
  };
  owner = await createAccount("owner", "owner");
  customer = await createAccount("customer", "customer");
  otherCustomer = await createAccount("other", "customer");
  car = await Car.create({ owner: owner.user.id, brand: "BMW", model: "X5", image: "https://example.com/car.jpg", year: 2023, category: "SUV", seatCapacity: 4, transmission: "Automatic", fuelType: "Petrol", pricePerDay: 100, location: "Colombo", description: "Test car" });
});

it.each([
  ["get", "/api/v1/owner/dashboard"],
  ["get", "/api/v1/cars/owner/my-cars"],
  ["get", "/api/v1/bookings/owner-bookings"],
  ["post", "/api/v1/cars"],
  ["post", "/api/v1/owner/add-car"],
  ["post", "/api/v1/owner/change-role"],
  ["patch", "/api/v1/cars/000000000000000000000001"],
  ["delete", "/api/v1/cars/000000000000000000000001"],
  ["patch", "/api/v1/bookings/000000000000000000000001/status"],
])("rejects customer access to %s %s", async (method, path) => {
  const response = await request(app)[method](path).set("Authorization", `Bearer ${customer.token}`).send({});
  expect(response.status).toBe(403);
});

it("allows owners to access their management endpoints", async () => {
  for (const path of ["/api/v1/owner/dashboard", "/api/v1/cars/owner/my-cars", "/api/v1/bookings/owner-bookings"]) {
    expect((await request(app).get(path).set("Authorization", `Bearer ${owner.token}`)).status).toBe(200);
  }
});

it("allows customers to book and cancel only their own booking", async () => {
  const created = await request(app).post("/api/v1/bookings").set("Authorization", `Bearer ${customer.token}`).send({ carId: car.id, pickupDate: "2099-06-01", returnDate: "2099-06-03", pickupLocation: "Colombo" });
  expect(created.status).toBe(201);
  const id = created.body.data._id;
  const mine = await request(app).get("/api/v1/bookings/my-bookings").set("Authorization", `Bearer ${customer.token}`);
  expect(mine.body.data.bookings).toHaveLength(1);
  expect(mine.body.data.bookings[0].car.image).toBe(car.image);
  const others = await request(app).get("/api/v1/bookings/my-bookings").set("Authorization", `Bearer ${otherCustomer.token}`);
  expect(others.body.data.bookings).toHaveLength(0);
  expect((await request(app).patch(`/api/v1/bookings/${id}/cancel`).set("Authorization", `Bearer ${otherCustomer.token}`).send({})).status).toBe(403);
  expect((await Booking.findById(id)).status).toBe("pending");
  expect((await request(app).patch(`/api/v1/bookings/${id}/cancel`).set("Authorization", `Bearer ${customer.token}`).send({})).status).toBe(200);
  expect((await Booking.findById(id)).status).toBe("cancelled");
});

it("prevents owners from creating customer bookings", async () => {
  expect((await request(app).post("/api/v1/bookings").set("Authorization", `Bearer ${owner.token}`).send({})).status).toBe(403);
  expect((await request(app).get("/api/v1/bookings/my-bookings").set("Authorization", `Bearer ${owner.token}`)).status).toBe(403);
});

it("uses the database role even if a token claims owner privileges", async () => {
  const token = generateToken(customer.user.id, "owner");
  expect((await request(app).get("/api/v1/owner/dashboard").set("Authorization", `Bearer ${token}`)).status).toBe(403);
});

it("rejects disabled and deleted accounts with existing tokens", async () => {
  await User.findByIdAndUpdate(customer.user.id, { isActive: false });
  expect((await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${customer.token}`)).status).toBe(401);
  await User.findByIdAndDelete(customer.user.id);
  expect((await request(app).get("/api/v1/auth/me").set("Authorization", `Bearer ${customer.token}`)).status).toBe(401);
});

it("requires login for booking and management", async () => {
  expect((await request(app).post("/api/v1/bookings").send({})).status).toBe(401);
  expect((await request(app).get("/api/v1/owner/dashboard")).status).toBe(401);
});