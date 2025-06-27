import User from "../models/userModel.js";

export const updateStreak = async (req, res) => {
  try {
    const today = new Date();
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.lastActiveDate) {
      user.streak = 1;
      user.lastActiveDate = today;
      await user.save();
      return res.status(200).json({ streak: user.streak });
    }
    if (user.lastActiveDate) {
      const lastActiveDate = new Date(user.lastActiveDate);
      const difference = Math.floor(
        (today - lastActiveDate) / (1000 * 60 * 60 * 24)
      );
      if (difference === 1) {
        user.streak += 1;
      } else if (difference > 1) {
        user.streak = 1;
      }

      user.lastActiveDate = today;
      await user.save();

      res.status(200).json({ streak: user.streak });
    }
  } catch (error) {
    res.status(500).json({ message: "Streak error" });
  }
};
