import Quiz from "../models/quiz.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import QuestionAttempt from "../models/questionAttempt.model.js";
import Question from "../models/question.model.js";

export const createAttempt = async (userId, quizId) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  const attempt = await QuizAttempt.create({
    userId,
    quizId,
    status: "in-progress",
    startTime: new Date(),
  });

  return attempt;
};

export const recordAnswer = async (
  userId,
  attemptId,
  { questionId, selectedAnswer, timeSpent },
) => {
  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  if (attempt.status !== "in-progress") {
    throw new Error("Attempt already submitted");
  }

  let qa = await QuestionAttempt.findOne({
    attemptId,
    questionId,
  });

  const question = await Question.findById(questionId);

  const isCorrect = selectedAnswer === question.correctAnswer;

  if (!qa) {
    await QuestionAttempt.create({
      attemptId,
      questionId,
      selectedAnswer,
      isCorrect,
      timeSpent,
    });
  } else {
    qa.selectedAnswer = selectedAnswer;
    qa.isCorrect = isCorrect;
    qa.timeSpent = timeSpent;
    await qa.save();
  }
};

export const finalizeAttempt = async (userId, attemptId) => {
  const attempt = await QuizAttempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");

  attempt.status = "submitted";
  attempt.endTime = new Date();

  await attempt.save();
};
