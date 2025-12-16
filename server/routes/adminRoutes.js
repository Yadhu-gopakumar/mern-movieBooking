import express from "express";
import { addMovie, getUsers } from "../controllers/adminControllers.js";
import auth from "../middlewares/authMiddlewares.js";
import admin from "../middlewares/adminMiddlewares.js";

const adminRouter = express.Router();

adminRouter.post("/movie", auth, admin, addMovie);
adminRouter.get("/users", auth, admin, getUsers);

export default adminRouter;
