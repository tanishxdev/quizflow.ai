// src/quiz/quiz.validator.js

export const validateQuizInput = (data) => {
  const { subject, topics, difficultyMode, totalQuestions, timeConfig } = data;

  // subject
  if (!subject || typeof subject !== "string") {
    throw new Error("Subject is required and must be a string.");
  }

  // topics
  if (
    !Array.isArray(topics) ||
    topics.length === 0 ||
    !topics.every((t) => typeof t === "string")
  ) {
    throw new Error("Topics must be a non-empty array of strings.");
  }

  // difficultyMode
  const allowedDifficulties = ["easy", "medium", "hard", "mixed"];
  if (!difficultyMode || !allowedDifficulties.includes(difficultyMode)) {
    throw new Error(
      `difficultyMode must be one of: ${allowedDifficulties.join(", ")}`,
    );
  }

  // totalQuestions
  if (typeof totalQuestions !== "number" || totalQuestions <= 0) {
    throw new Error("totalQuestions must be a positive number.");
  }

  // timeConfig
  if (
    !timeConfig ||
    typeof timeConfig !== "object" ||
    !["per-question", "total"].includes(timeConfig.mode) ||
    typeof timeConfig.value !== "number" ||
    timeConfig.value <= 0
  ) {
    throw new Error("timeConfig must have valid mode and positive value.");
  }
};
