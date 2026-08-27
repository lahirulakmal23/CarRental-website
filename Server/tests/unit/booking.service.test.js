// tests/unit/booking.service.test.js
import { calculateTotalPrice, assertValidTransition } from "../../services/booking.services";

describe("calculateTotalPrice", () => {
  it("calculates price correctly for a 2-day booking", () => {
    const price = calculateTotalPrice(100, "2026-08-01", "2026-08-03");
    expect(price).toBe(200);
  });

  it("charges minimum 1 day even for same-day range edge cases", () => {
    const price = calculateTotalPrice(100, "2026-08-01", "2026-08-01T12:00:00");
    expect(price).toBeGreaterThanOrEqual(100);
  });
});

describe("assertValidTransition", () => {
  it("allows pending -> confirmed", () => {
    expect(() => assertValidTransition("pending", "confirmed")).not.toThrow();
  });

  it("blocks confirmed -> completed (must go through ongoing)", () => {
    expect(() => assertValidTransition("confirmed", "completed")).toThrow();
  });

  it("blocks any transition from a terminal state", () => {
    expect(() => assertValidTransition("completed", "cancelled")).toThrow();
    expect(() => assertValidTransition("cancelled", "pending")).toThrow();
  });
});