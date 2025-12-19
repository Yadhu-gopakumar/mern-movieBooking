import express from "express";
import { addMovie, getOwners,deleteOwner,updateMovie,deleteMovie } from "../controllers/adminControllers.js";
import auth from "../middlewares/authMiddlewares.js";
import admin from "../middlewares/adminMiddlewares.js";

const adminRouter = express.Router();


// ===== OWNERS =====
adminRouter.get("/owners", auth, admin, getOwners);      // fetch owners only
adminRouter.delete("/owners/:id", auth, admin, deleteOwner); // delete owner

// ===== MOVIES =====
adminRouter.post("/movie", auth, admin, addMovie);          // add movie
adminRouter.put("/movie/:id", auth, admin, updateMovie);    // edit movie
adminRouter.delete("/movie/:id", auth, admin, deleteMovie); // delete movie

export default adminRouter;
