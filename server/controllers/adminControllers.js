import Movie from "../models/movieModel.js";
import {User} from "../models/userModel.js";

export const addMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
export const getOwners = async (req, res) => {
  const owners = await User.find({ role: "owner" }).select("-password");
  res.json(owners);
};
export const deleteOwner = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Owner deleted" });
};
export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(movie);
};
export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
