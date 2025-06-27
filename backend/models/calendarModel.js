import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ISO string: YYYY-MM-DD
  text: { type: String, required: true },
  color: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
