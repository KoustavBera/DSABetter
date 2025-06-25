import Question from "../models/questionModel.js";
import mongoose from "mongoose";
// ✅ Get all questions for authenticated user
export const getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(questions); // Always return an array
  } catch (error) {
    console.error("getAllQuestion error:", error.message);
    res
      .status(500)
      .json({ message: "getAllQuestion error [@question.controller.js]" });
  }
};

// ✅ Add a new question
export const addQuestion = async (req, res) => {
  const {
    title,
    link,
    site,
    difficulty,
    topic,
    status,
    notes,
    lastRevised,
    nextRevision,
  } = req.body;

  if (!title || !link || !topic) {
    return res
      .status(400)
      .json({ message: "Title, link and topic are required" });
  }

  try {
    const newQuestion = await Question.create({
      user: req.userId, // ✅ Correctly using userId from isAuth
      title,
      link,
      site,
      difficulty,
      topic,
      status,
      notes,
      lastRevised,
      nextRevision,
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error saving question:", error.message);
    res.status(500).json({ message: "Could not save question" });
  }
};

// ✅ Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await question.deleteOne();
    res.status(200).json({ message: "Question deleted!" });
  } catch (error) {
    console.error("Error deleting question:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update a question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDifficultyStats = async (req, res) => {
  try {
    const stats = await Question.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) },
      },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Difficulty stats error:", error.message);
    res.status(500).json({ message: "Error fetching difficulty stats" });
  }
};

export const getSiteStats = async (req, res) => {
  try {
    const stats = await Question.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.userId) },
      },
      {
        $group: {
          _id: "$site",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching site stats" });
  }
};

export const updateRevision = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question)
      return res.status(404).json({
        message: "Question not found",
      });

    const today = new Date().toDateString();
    const lastRevisionDate = question.lastRevisionDate?.toDateString();

    //Only  increase if not today
    if (today !== lastRevisionDate) {
      question.revision = question.revision + 1;
      question.lastRevisionDate = new Date();
      await question.save();
    }

    res.status(200).json({ revision: question.revision });
  } catch (error) {
    console.log("Revision update error", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
