import express from "express"
import {
    signup,login,logout,profile,checkUser,checkAdmin
} from "../controllers/authControllers.js"

import auth from "../middlewares/authMiddlewares.js"

const authRouter=express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", auth, logout);
authRouter.get("/profile", auth, profile);
authRouter.get("/check-user", auth, checkUser);
authRouter.get("/check-admin", auth, checkAdmin);

export default authRouter;
