import Show from "../models/showModel.js";
import Theater from "../models/theatreModel.js";
import Movie from "../models/movieModel.js";

// Get all movies (global list)
export const getMovies = (req, res) => {
    res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      data: []
    });
  };
  
  // Get shows for a selected movie
  export const getShowsByMovie = (req, res) => {
    const { movieId } = req.params;
  
    res.status(200).json({
      success: true,
      message: `Shows fetched for movie ${movieId}`,
      data: []
    });
  };
  export const searchTheaters = async (req, res) => {
    try {
      const { movieId, city, date } = req.query;
  
      if (!movieId) {
        return res.status(400).json({ message: "movieId is required" });
      }
  
      // find shows for the movie
      let showQuery = { movieId };
  
      if (date) showQuery.date = date;
  
      const shows = await Show.find(showQuery)
        .populate("theaterId")
        .populate("movieId");
  
      // optional city filter
      const filteredShows = city
        ? shows.filter(
            (s) =>
              s.theaterId.location.toLowerCase() === city.toLowerCase()
          )
        : shows;
  
      res.status(200).json({
        message: "Theaters fetched successfully",
        data: filteredShows
      });
    } catch (error) {
      res.status(500).json({ message: "Search failed", error: error.message });
    }
  };

  export const getShowSeats = async (req, res) => {
    const seats = await Seat.find({ show: req.params.showId });
    res.json(seats);
  };
  export const lockSeats = async (req, res) => {
    const { showId, seats } = req.body;
  
    await Seat.updateMany(
      { show: showId, seatNumber: { $in: seats }, status: "available" },
      { status: "locked" }
    );
  
    res.json({ message: "Seats locked" });
  };
  export const createBooking = async (req, res) => {
    const { showId, seats, totalAmount } = req.body;
  
    await Seat.updateMany(
      { show: showId, seatNumber: { $in: seats } },
      { status: "booked" }
    );
  
    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      seats,
      totalAmount,
      paymentStatus: "paid",
    });
  
    res.status(201).json(booking);
  };
  export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("show");
  
    res.json(bookings);
  };
        