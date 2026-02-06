// src/attempt/attempt.validator.js

export const validateSaveAnswerInput = (data) => {
  const { questionId, selectedAnswer, timeSpent } = data;

  // questionId
  if (!questionId || typeof questionId !== "string") {
    throw new Error("questionId is required and must be a string.");
  }

  // selectedAnswer
  if (!selectedAnswer || typeof selectedAnswer !== "string") {
    throw new Error("selectedAnswer is required and must be a string.");
  }

  // timeSpent
  if (typeof timeSpent !== "number" || timeSpent <= 0) {
    throw new Error("timeSpent must be a positive number.");
  }
};
