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
