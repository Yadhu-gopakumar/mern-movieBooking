import express from "express";
import {
  addTheater,
  updateTheater,
  deleteTheater,
  addShow,
  updateShow,
  deleteShow,
  getShows,
} from "../controllers/ownerControllers.js";

import auth from "../middlewares/authMiddlewares.js";
import owner from "../middlewares/ownerMiddlewares.js";

const ownerRouter = express.Router();

/* ===== THEATERS ===== */
ownerRouter.post("/theater", auth, owner, addTheater);
ownerRouter.put("/theater/:id", auth, owner, updateTheater);
ownerRouter.delete("/theater/:id", auth, owner, deleteTheater);

/* ===== SHOWS ===== */
ownerRouter.post("/show", auth, owner, addShow);
ownerRouter.put("/show/:id", auth, owner, updateShow);
ownerRouter.delete("/show/:id", auth, owner, deleteShow);
ownerRouter.get("/shows", auth, owner, getShows);

export default ownerRouter;
