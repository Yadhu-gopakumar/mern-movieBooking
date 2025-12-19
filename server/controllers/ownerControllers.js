import Theater from "../models/theatreModel.js";
import Show from "../models/showModel.js";

export const addTheater = async (req, res) => {
  const theater = await Theater.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.status(201).json(theater);
};

export const updateTheater = async (req, res) => {
  const theater = await Theater.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );

  res.json(theater);
};
export const deleteTheater = async (req, res) => {
  await Theater.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id
  });

  res.json({ message: "Theater deleted" });
};

export const addShow = async (req, res) => {
  const theater = await Theater.findById(theaterId);

  const seats = [];

  theater.seatLayout.forEach(r => {
    for (let i = 1; i <= r.seatCount; i++) {
      seats.push({
        theater: theater._id,
        show: show._id,
        seatNumber: `${r.row}${i}`, // A1, A2
        price: r.price,
      });
    }
  });

  await Seat.insertMany(seats);

};
export const updateShow = async (req, res) => {
  const show = await Show.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );

  res.json(show);
};
export const deleteShow = async (req, res) => {
  await Show.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id
  });

  res.json({ message: "Show deleted" });
};

export const getShows = async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
};
