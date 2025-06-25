import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      default: "Custom",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Unknown"],
      default: "Unknown",
    },
    topic: {
      type: [String], // e.g. ["Arrays", "DP", "Backtracking"]
      required: true,
    },
    status: {
      type: String,
      enum: ["Unsolved", "Solved", "Marked for Revision"],
      default: "Unsolved",
    },
    notes: {
      type: String,
      default: "",
    },
    lastRevised: {
      type: Date,
    },
    nextRevision: {
      type: Date,
    },
    revision: {
      type: Number,
      default: 0,
    },
    lastRevisionDate: {
      type: Date,
    },
    revisionHistory: [
      {
        date: Date,
        status: String, // e.g. "Reviewed", "Skipped"
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
