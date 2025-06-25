import mongoose from "mongoose";
import Question from "../models/questionModel.js";

export const getRevisionHistoryStats = async (req, res) => {
  try {
    const stats = await Question.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) },
      },
      {
        $unwind: "$revisionHistory",
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$revisionHistory.date",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Revision history stats error:", error.message);
    res.status(500).json({ message: "Failed to fetch revision stats" });
  }
};
