import express from "express";
import { getMovies, getShowsByMovie,searchTheaters } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/movies", getMovies);
userRouter.get("/shows/:movieId", getShowsByMovie);
userRouter.get("/search-theaters", searchTheaters);

export default userRouter;
