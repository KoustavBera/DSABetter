import express from "express";
import {
  getUserData,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getuser", isAuth, getUserData);

export default authRouter;
