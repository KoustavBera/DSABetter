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
export const getDailyGrowth = async (req, res) => {
  try {
    const revisionStats = await Question.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.userId) } },
      { $unwind: "$revisionHistory" },
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
      { $sort: { _id: -1 } },
      { $limit: 2 },
      { $sort: { _id: 1 } },
    ]);

    if (revisionStats.length < 1) {
      return res.status(200).json({ growth: 0 });
    }

    const [prev, curr] = revisionStats;

    const prevDate = new Date(prev._id);
    const currDate = new Date(curr._id);

    // Calculate difference in days
    const diffInDays = Math.floor(
      (currDate - prevDate) / (1000 * 60 * 60 * 24)
    );

    let growth;

    if (diffInDays !== 1) {
      // No revision on actual "yesterday", so assume 0 for previous
      growth = 100; // full growth from 0 → some number
    } else {
      growth = ((curr.count - prev.count) / prev.count) * 100;
    }
    if (growth >= 0) {
      res.status(200).json({
        growth: `+${growth.toFixed(1)}%`,
        color: "text-green-500",
      });
    } else {
      res.status(200).json({
        growth: `${growth.toFixed(1)}%`,
        color: "text-red-500",
      });
    }
  } catch (error) {
    console.error("Error calculating growth:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
