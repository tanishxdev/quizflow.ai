import AnalyticsSnapshot from "../models/analyticsSnapshot.model.js";
import QuestionAttempt from "../models/questionAttempt.model.js";
import Question from "../models/question.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";

/**
 * ===============================
 * WRITE ANALYTICS (AFTER SUBMIT)
 * ===============================
 * Updates analytics snapshots for a submitted attempt
 */
export const updateAnalyticsForAttempt = async (userId, attemptId) => {
  // 🔒 Ownership + status check
  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    userId,
  });

  if (!attempt) {
    throw new Error("Attempt not found or access denied for analytics.");
  }

  if (attempt.status !== "submitted") {
    throw new Error("Analytics can only be updated for submitted attempts.");
  }

  const questionAttempts = await QuestionAttempt.find({
    attemptId,
  });

  if (!questionAttempts.length) return;

  const questionIds = questionAttempts.map((q) => q.questionId);

  const questions = await Question.find({
    _id: { $in: questionIds },
  });

  for (const qa of questionAttempts) {
    const q = questions.find(
      (x) => x._id.toString() === qa.questionId.toString(),
    );

    // Defensive guard
    if (!q) continue;

    const filter = {
      userId,
      subject: q.subject,
      topic: q.topic,
      difficulty: q.difficulty,
    };

    let snapshot = await AnalyticsSnapshot.findOne(filter);

    if (!snapshot) {
      snapshot = new AnalyticsSnapshot({
        ...filter,
        totalAttempts: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        avgAccuracy: 0,
        avgTime: 0,
      });
    }

    snapshot.totalQuestions += 1;
    snapshot.totalAttempts += 1;

    if (qa.isCorrect) {
      snapshot.correctAnswers += 1;
    }

    snapshot.avgAccuracy =
      (snapshot.correctAnswers / snapshot.totalQuestions) * 100;

    snapshot.avgTime =
      snapshot.avgTime === 0
        ? qa.timeSpent
        : (snapshot.avgTime + qa.timeSpent) / 2;

    snapshot.lastUpdatedAt = new Date();

    await snapshot.save();
  }
};

/**
 * ===============================
 * READ ANALYTICS — ATTEMPT HISTORY
 * ===============================
 * Returns list of past quiz attempts
 */
export const getAttemptHistory = async (userId) => {
  const attempts = await QuizAttempt.find({
    userId,
    status: "submitted",
  }).sort({ endTime: -1 });

  return attempts.map((a) => ({
    attemptId: a._id,
    quizId: a.quizId,
    startTime: a.startTime,
    endTime: a.endTime,
    totalTime: a.endTime && a.startTime ? (a.endTime - a.startTime) / 1000 : 0,
    accuracy: a.accuracy || 0,
  }));
};

/**
 * ===============================
 * READ ANALYTICS — CONSISTENCY
 * ===============================
 * Measures performance stability over time
 */
export const calculateConsistency = async (userId) => {
  const attempts = await QuizAttempt.find({
    userId,
    status: "submitted",
  }).sort({ endTime: 1 });

  if (attempts.length < 2) {
    return { consistencyScore: 100 };
  }

  const accuracies = attempts.map((a) => a.accuracy || 0);

  const avg = accuracies.reduce((s, v) => s + v, 0) / accuracies.length;

  const variance =
    accuracies.reduce((s, v) => s + Math.abs(v - avg), 0) / accuracies.length;

  const consistencyScore = Math.max(0, 100 - variance);

  return {
    consistencyScore: Number(consistencyScore.toFixed(2)),
  };
};

/**
 * ===============================
 * READ ANALYTICS — TOPIC STRENGTH
 * ===============================
 * Classifies topics as strong / average / weak
 */
export const classifyTopics = async (userId) => {
  const snapshots = await AnalyticsSnapshot.find({
    userId,
  });

  return snapshots.map((s) => {
    let level = "average";

    if (s.avgAccuracy >= 75) level = "strong";
    else if (s.avgAccuracy < 40) level = "weak";

    return {
      subject: s.subject,
      topic: s.topic,
      difficulty: s.difficulty,
      accuracy: s.avgAccuracy,
      level,
    };
  });
};
