import mongoose from "mongoose";

const questionAttemptSchema = new mongoose.Schema(
  {
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizAttempt",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    selectedAnswer: String,
    isCorrect: Boolean,
    timeSpent: Number,
  },
  { timestamps: true },
);

export default mongoose.model("QuestionAttempt", questionAttemptSchema);
