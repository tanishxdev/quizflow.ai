import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  text: String,
  options: [String],
  correctAnswer: String,
  topic: String,
  difficulty: String,
  expectedTime: Number,
});

export default mongoose.model("Question", questionSchema);
