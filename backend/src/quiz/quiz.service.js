import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";

export const createQuiz = async (userId, config) => {
  const { subject, topics, difficultyMode, totalQuestions, timeConfig } =
    config;

  // 1️⃣ Create quiz template
  const quiz = await Quiz.create({
    subject,
    topics,
    difficultyMode,
    totalQuestions,
    timeConfig,
    createdBy: userId,
  });

  // 2️⃣ Generate mock questions
  const questions = [];

  for (let i = 0; i < totalQuestions; i++) {
    questions.push({
      quizId: quiz._id,
      text: `Sample question ${i + 1} on ${topics[0]}`,
      options: ["A", "B", "C", "D"],
      correctAnswer: "A",
      topic: topics[0],
      difficulty: difficultyMode,
      expectedTime: timeConfig.value,
    });
  }

  // 3️⃣ Save questions
  await Question.insertMany(questions);

  return quiz;
};
