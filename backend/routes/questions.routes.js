import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestion,
  getDifficultyStats,
  getSiteStats,
  updateQuestion,
  updateRevision,
} from "../controllers/question.controller.js";
import { updateStreak } from "../controllers/streak.controller.js";
import {
  getDailyGrowth,
  getRevisionHistoryStats,
  getRevisionHistoryStatsWeekly,
} from "../controllers/revision.controller.js";
const questionRouter = express.Router();

questionRouter.get("/", isAuth, getAllQuestion);
questionRouter.post("/", isAuth, addQuestion);
questionRouter.delete("/:id", isAuth, deleteQuestion);
questionRouter.patch("/:id", isAuth, updateQuestion);
questionRouter.get("/streak", isAuth, updateStreak);
questionRouter.get("/stats/difficulty", isAuth, getDifficultyStats);
questionRouter.get("/stats/site", isAuth, getSiteStats);
questionRouter.get("/stats/revision/:id", isAuth, updateRevision);
questionRouter.get("/stats/revisionHistory", isAuth, getRevisionHistoryStats);
questionRouter.get("/stats/growth", isAuth, getDailyGrowth);
questionRouter.get("/stats/week", isAuth, getRevisionHistoryStatsWeekly);
export default questionRouter;
