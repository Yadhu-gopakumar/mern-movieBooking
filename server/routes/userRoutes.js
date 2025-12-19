import express from "express";
import {
  getMovies,
  getShowsByMovie,
  searchTheaters,
  getShowSeats,
  lockSeats,
  createBooking,
  getMyBookings,
} from "../controllers/userControllers.js";

import auth from "../middlewares/authMiddlewares.js";

const userRouter = express.Router();

/* ===== BROWSING ===== */
userRouter.get("/movies", getMovies);
userRouter.get("/shows/:movieId", getShowsByMovie);
userRouter.get("/search-theaters", searchTheaters);

/* ===== BOOKING FLOW ===== */
userRouter.get("/shows/:showId/seats", auth, getShowSeats);     // seating page
userRouter.post("/seats/lock", auth, lockSeats);                // select seats
userRouter.post("/bookings", auth, createBooking);              // dummy payment
userRouter.get("/bookings/me", auth, getMyBookings);            // user bookings

export default userRouter;
