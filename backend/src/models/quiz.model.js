import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    sourceType: { type: String, enum: ["topic", "pdf", "link"] },
    subject: String,
    topics: [String],
    difficultyMode: String,
    totalQuestions: Number,
    timeConfig: {
      mode: String,
      value: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Quiz", quizSchema);
