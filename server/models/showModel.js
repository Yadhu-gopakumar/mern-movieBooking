import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    theaterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true
    },
    date: String,
    time: String,
    price: Number,
    seats: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

const Show= mongoose.model("Show", showSchema);
export default Show;