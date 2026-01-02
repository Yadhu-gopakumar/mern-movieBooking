import Theater from "../models/theatreModel.js";
import Show from "../models/showModel.js";
import Seat from "../models/seatModel.js";

export const getMyTheaters = async (req, res) => {
  const theaters = await Theater.find({ ownerId: req.user.id });
  res.json(theaters);
};


export const addTheater = async (req, res) => {
  try {
    const theater = await Theater.create({
      ...req.body,
      ownerId: req.user.id, // enforced from auth
    });

    res.status(201).json({
      success: true,
      message: "Theater added successfully",
      data: theater,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add theater",
      error: error.message,
    });
  }
};


export const updateTheater = async (req, res) => {
  try {
    const theater = await Theater.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      req.body,
      { new: true }
    );

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json(theater);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getTheaterById = async (req, res) => {
  const theater = await Theater.findOne({
    _id: req.params.id,
    ownerId: req.user.id,
  });

  if (!theater) {
    return res.status(404).json({ message: "Theater not found" });
  }

  res.json(theater);
};

export const addShow = async (req, res) => {
  try {
    const { movieId, theaterId, date, time, basePrice } = req.body;

    // 1️⃣ Verify theater belongs to owner
    const theater = await Theater.findOne({
      _id: theaterId,
      ownerId: req.user.id,
    });

    if (!theater) {
      return res.status(403).json({
        message: "You do not own this theater",
      });
    }

    // 2️⃣ Create show (NO seats field)
    const show = await Show.create({
      movieId,
      theaterId,
      date,
      time,
      basePrice,
    });

    // 3️⃣ Create seats for this show
    const seatDocs = [];

    theater.seatLayout.forEach((row) => {
      for (let i = 1; i <= row.seatCount; i++) {
        seatDocs.push({
          theater: theater._id,
          show: show._id,
          seatNumber: `${row.row}${i}`,
          price: row.price ?? basePrice, // 👈 fallback
          isBooked: false,
          isLocked: false,
        });
      }
    });

    await Seat.insertMany(seatDocs);

    res.status(201).json({
      message: "Show created and seats generated successfully",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create show",
      error: error.message,
    });
  }
};

export const updateShow = async (req, res) => {
  try {
    const { basePrice, date, time } = req.body;

    const show = await Show.findOneAndUpdate(
      { _id: req.params.id },
      { basePrice, date, time },
      { new: true }
    );

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.json(show);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    await Seat.deleteMany({ show: show._id });

    res.json({ message: "Show and seats deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getShows = async (req, res) => {
  const shows = await Show.find()
    .populate("theaterId", "name location")
    .populate("movieId", "title")
    .select("movieId theaterId date time basePrice");

  res.json(shows);
};

