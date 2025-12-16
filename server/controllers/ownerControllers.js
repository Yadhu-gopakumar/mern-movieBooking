import Theater from "../models/theatreModel.js";
import Show from "../models/showModel.js";

export const addTheater = async (req, res) => {
  const theater = await Theater.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.status(201).json(theater);
};

export const addShow = async (req, res) => {
  const show = await Show.create(req.body);
  res.status(201).json(show);
};

export const getShows = async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
};
