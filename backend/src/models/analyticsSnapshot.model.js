import mongoose from "mongoose";

const analyticsSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    subject: String, // e.g. "OS"
    topic: String, // e.g. "Deadlock"
    difficulty: String, // easy / medium / hard

    totalAttempts: Number,
    totalQuestions: Number,
    correctAnswers: Number,

    avgAccuracy: Number,
    avgTime: Number,

    lastUpdatedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("AnalyticsSnapshot", analyticsSnapshotSchema);
