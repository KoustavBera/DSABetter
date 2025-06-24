import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../controllers/question.controller.js";
const questionRouter = express.Router();

questionRouter.get("/", isAuth, getAllQuestion);
questionRouter.post("/", isAuth, addQuestion);
questionRouter.delete("/:id", isAuth, deleteQuestion);
questionRouter.patch("/:id", isAuth, updateQuestion);

export default questionRouter;
