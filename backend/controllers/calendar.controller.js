import Reminder from "../models/calendarModel.js";

// Get all reminders for the authenticated user
export const getCalendar = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.userId });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching reminders" });
  }
};

// Add a new reminder
export const addCalendar = async (req, res) => {
  const { date, text, color } = req.body;
  try {
    const reminder = new Reminder({ date, text, color, user: req.userId });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Server error adding reminder" });
  }
};

// Delete a reminder
export const deleteCalendar = async (req, res) => {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findById(id);

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    if (reminder.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this reminder" });
    }

    await Reminder.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error deleting reminder" });
  }
};
