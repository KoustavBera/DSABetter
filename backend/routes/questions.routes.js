import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestion,
  getDifficultyStats,
  getSiteStats,
  updateQuestion,
} from "../controllers/question.controller.js";
import { updateStreak } from "../controllers/streak.controller.js";
const questionRouter = express.Router();

questionRouter.get("/", isAuth, getAllQuestion);
questionRouter.post("/", isAuth, addQuestion);
questionRouter.delete("/:id", isAuth, deleteQuestion);
questionRouter.patch("/:id", isAuth, updateQuestion);
questionRouter.get("/streak", isAuth, updateStreak);
questionRouter.get("/stats/difficulty", isAuth, getDifficultyStats);
questionRouter.get("/stats/site", isAuth, getSiteStats);
questionRouter.get("/stats/revision/:id", isAuth, updateQuestion);
export default questionRouter;
