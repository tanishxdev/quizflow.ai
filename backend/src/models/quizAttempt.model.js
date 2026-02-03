import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    status: { type: String, enum: ["in-progress", "submitted"] },
    startTime: Date,
    endTime: Date,
    score: Number,
    accuracy: Number,
  },
  { timestamps: true },
);

export default mongoose.model("QuizAttempt", quizAttemptSchema);
