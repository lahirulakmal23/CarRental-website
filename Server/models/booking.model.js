import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    pickupLocation: { type: String, required: true },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ car: 1, pickupDate: 1, returnDate: 1 });

bookingSchema.pre("validate", function () {
  if (this.returnDate <= this.pickupDate) {
    throw new Error("returnDate must be after pickupDate");
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;