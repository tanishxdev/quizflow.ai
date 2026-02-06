import AnalyticsSnapshot from "../models/analyticsSnapshot.model.js";
import QuestionAttempt from "../models/questionAttempt.model.js";
import Question from "../models/question.model.js";

export const updateAnalyticsForAttempt = async (userId, attemptId) => {
  const questionAttempts = await QuestionAttempt.find({ attemptId });
  const questionIds = questionAttempts.map((q) => q.questionId);

  const questions = await Question.find({
    _id: { $in: questionIds },
  });

  for (const qa of questionAttempts) {
    const q = questions.find(
      (x) => x._id.toString() === qa.questionId.toString(),
    );

    const filter = {
      userId,
      subject: q.subject,
      topic: q.topic,
      difficulty: q.difficulty,
    };

    const snapshot =
      (await AnalyticsSnapshot.findOne(filter)) ||
      new AnalyticsSnapshot({
        ...filter,
        totalAttempts: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        avgAccuracy: 0,
        avgTime: 0,
      });

    snapshot.totalQuestions += 1;
    snapshot.totalAttempts += 1;
    if (qa.isCorrect) snapshot.correctAnswers += 1;

    snapshot.avgAccuracy =
      (snapshot.correctAnswers / snapshot.totalQuestions) * 100;

    snapshot.avgTime = (snapshot.avgTime + qa.timeSpent) / 2;

    snapshot.lastUpdatedAt = new Date();

    await snapshot.save();
  }
};
