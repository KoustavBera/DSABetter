import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import questionRouter from "./routes/questions.routes.js";
import calendarRouter from "./routes/calendar.routes.js";
const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/questions", questionRouter);
app.use("/api/calendar", calendarRouter);
app.get("/", (req, res) => {
  res.send("Backend is on");
});
app.listen(PORT, () => {
  connectDB();
  console.log("Backend has started ");
});
