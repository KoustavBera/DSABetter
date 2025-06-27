import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addCalendar,
  deleteCalendar,
  getCalendar,
} from "../controllers/calendar.controller.js";
const calendarRouter = express.Router();

calendarRouter.get("/", isAuth, getCalendar);
// POST new reminder
calendarRouter.post("/", isAuth, addCalendar);

// DELETE a reminder
calendarRouter.delete("/:id", isAuth, deleteCalendar);

export default calendarRouter;
