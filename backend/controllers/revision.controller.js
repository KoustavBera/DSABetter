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
    // Check if userId exists
    if (!req.userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const revisionStats = await Question.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.userId) } },
      { $unwind: "$revisionHistory" },
      // Add null check for revisionHistory.date
      { $match: { "revisionHistory.date": { $exists: true, $ne: null } } },
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
      return res.status(200).json({
        growth: "0.0%",
        color: "text-gray-500",
      });
    }

    // Handle case with only one data point
    if (revisionStats.length === 1) {
      return res.status(200).json({
        growth: "+100.0%",
        color: "text-green-500",
      });
    }

    const [prev, curr] = revisionStats;

    // Add validation for date parsing
    const prevDate = new Date(prev._id);
    const currDate = new Date(curr._id);

    if (isNaN(prevDate.getTime()) || isNaN(currDate.getTime())) {
      console.error("Invalid date format in revision stats");
      return res.status(500).json({ message: "Invalid date format" });
    }

    // Calculate difference in days
    const diffInDays = Math.floor(
      (currDate - prevDate) / (1000 * 60 * 60 * 24)
    );

    let growth;

    if (diffInDays !== 1) {
      // No revision on actual "yesterday", so assume 0 for previous
      growth = 100; // full growth from 0 → some number
    } else {
      // Prevent division by zero
      if (prev.count === 0) {
        growth = curr.count > 0 ? 100 : 0;
      } else {
        growth = ((curr.count - prev.count) / prev.count) * 100;
      }
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
    console.error("Stack trace:", error.stack);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getRevisionHistoryStatsWeekly = async (req, res) => {
  try {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 28);

    const dailyStats = await Question.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $unwind: "$revisionHistory",
      },
      {
        $match: {
          "revisionHistory.date": {
            $gte: startDate,
          },
        },
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
    /*

[
dailyStats:
  { _id: "2025-06-01", count: 2 },
  { _id: "2025-06-03", count: 4 },
  { _id: "2025-06-04", count: 1 },
  { _id: "2025-06-07", count: 3 }
]
*/

    // objectification
    const dateToCount = {};
    dailyStats.forEach(({ _id, count }) => {
      dateToCount[_id] = count;
    });

    /**
     * dateToCount (object)
     * {
  "2025-06-01": 2,
  "2025-06-03": 4,
  "2025-06-04": 1,
  "2025-06-07": 3
}

     */
    const weeklyStats = [
      { week: "Week 1", count: 0 },
      { week: "Week 2", count: 0 },
      { week: "Week 3", count: 0 },
      { week: "Week 4", count: 0 },
    ];

    //now loop all 28 days and make offsets week1,week2,...3
    for (let i = 27; i >= 0; i--) {
      const date = new Date(now); //today
      date.setDate(now.getDate() - i); //at first 28 days ago
      const isoDate = date.toISOString().split("T")[0];

      const weekIndex = Math.floor((27 - i) / 7); //0 to 3
      weeklyStats[weekIndex].count += dateToCount[isoDate] || 0;
    }
    res.status(200).json(weeklyStats);
  } catch (error) {
    console.error("Revision history stats error:", error.message);
    res.status(500).json({ message: "Failed to fetch revision stats" });
  }
};
