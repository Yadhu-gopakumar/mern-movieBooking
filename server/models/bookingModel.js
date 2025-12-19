import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    seats: [String], // ["A1", "A2"]
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["paid", "failed"],
      default: "paid", // dummy payment
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
const Bookings=mongoose.model("bookings",bookingSchema);
export default Bookings;  