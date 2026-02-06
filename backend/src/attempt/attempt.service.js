import Quiz from "../models/quiz.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import QuestionAttempt from "../models/questionAttempt.model.js";
import Question from "../models/question.model.js";

/**
 * Create a quiz attempt
 * Rule: Only one in-progress attempt per quiz per user
 */
export const createAttempt = async (userId, quizId) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  const existingAttempt = await QuizAttempt.findOne({
    userId,
    quizId,
    status: "in-progress",
  });

  if (existingAttempt) {
    throw new Error("An active attempt already exists for this quiz.");
  }

  const attempt = await QuizAttempt.create({
    userId,
    quizId,
    status: "in-progress",
    startTime: new Date(),
  });

  return attempt;
};

/**
 * Record answer for a question
 * Rules:
 * - Attempt must belong to user
 * - Attempt must be in-progress
 * - Question must belong to the quiz
 */
export const recordAnswer = async (
  userId,
  attemptId,
  { questionId, selectedAnswer, timeSpent },
) => {
  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    userId,
  });

  if (!attempt) {
    throw new Error("Attempt not found or access denied.");
  }

  if (attempt.status !== "in-progress") {
    throw new Error("Attempt already submitted.");
  }

  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error("Question not found.");
  }

  // Question must belong to quiz
  if (question.quizId.toString() !== attempt.quizId.toString()) {
    throw new Error("Question does not belong to this quiz.");
  }

  const isCorrect = selectedAnswer === question.correctAnswer;

  let qa = await QuestionAttempt.findOne({
    attemptId,
    questionId,
  });

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

/**
 * Submit quiz attempt
 * Rules:
 * - Attempt must belong to user
 * - Cannot submit twice
 */
export const finalizeAttempt = async (userId, attemptId) => {
  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    userId,
  });

  if (!attempt) {
    throw new Error("Attempt not found or access denied.");
  }

  if (attempt.status !== "in-progress") {
    throw new Error("Attempt already submitted.");
  }

  attempt.status = "submitted";
  attempt.endTime = new Date();

  await attempt.save();
};
