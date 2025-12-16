import express from "express";
import {
  addTheater,
  addShow,
  getShows
} from "../controllers/ownerControllers.js";
import auth from "../middlewares/authMiddlewares.js";
import owner from "../middlewares/ownerMiddlewares.js";

const ownerRouter = express.Router();

ownerRouter.post("/theater", auth, owner, addTheater);
ownerRouter.post("/show", auth, owner, addShow);
ownerRouter.get("/shows", auth, owner, getShows);

export default ownerRouter;
