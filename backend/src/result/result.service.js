import QuizAttempt from "../models/quizAttempt.model.js";
import QuestionAttempt from "../models/questionAttempt.model.js";
import Question from "../models/question.model.js";

export const buildResult = async (userId, attemptId) => {
  // 🔒 Ownership + existence check
  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    userId,
  });

  if (!attempt) {
    throw new Error("Attempt not found or access denied.");
  }

  if (attempt.status !== "submitted") {
    throw new Error("Attempt not submitted yet.");
  }

  const questionAttempts = await QuestionAttempt.find({
    attemptId,
  });

  const questionIds = questionAttempts.map((q) => q.questionId);
  const questions = await Question.find({
    _id: { $in: questionIds },
  });

  let correct = 0;
  let incorrect = 0;
  let totalTime = 0;

  const difficultyStats = {};
  const topicStats = {};

  for (const qa of questionAttempts) {
    totalTime += qa.timeSpent;

    if (qa.isCorrect) correct++;
    else incorrect++;

    const q = questions.find(
      (x) => x._id.toString() === qa.questionId.toString(),
    );

    // Defensive check (should not happen, but safe)
    if (!q) continue;

    // difficulty analysis
    if (!difficultyStats[q.difficulty]) {
      difficultyStats[q.difficulty] = {
        total: 0,
        correct: 0,
      };
    }

    difficultyStats[q.difficulty].total++;
    if (qa.isCorrect) difficultyStats[q.difficulty].correct++;

    // topic analysis
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, correct: 0 };
    }

    topicStats[q.topic].total++;
    if (qa.isCorrect) topicStats[q.topic].correct++;
  }

  const difficultyAnalysis = {};
  for (const d in difficultyStats) {
    difficultyAnalysis[d] = {
      accuracy: (difficultyStats[d].correct / difficultyStats[d].total) * 100,
    };
  }

  const topicAnalysis = Object.keys(topicStats).map((t) => ({
    topic: t,
    accuracy: (topicStats[t].correct / topicStats[t].total) * 100,
  }));

  return {
    summary: {
      totalQuestions: questionAttempts.length,
      attempted: questionAttempts.length,
      correct,
      incorrect,
      accuracy:
        questionAttempts.length > 0
          ? (correct / questionAttempts.length) * 100
          : 0,
      totalTime,
    },
    difficultyAnalysis,
    topicAnalysis,
  };
};
