export const validateQuizInput = (data) => {
  const { subject, topic, totalQuestions } = data;

  if (!subject || typeof subject !== "string") {
    return { valid: false, message: "Invalid or missing subject." };
  }

  if (!topic || typeof topic !== "string" || topic.length < 5) {
    return {
      valid: false,
      message:
        "Invalid or missing topic. Topic should be at least 5 characters long.",
    };
  }

  if (
    !totalQuestions ||
    typeof totalQuestions !== "number" ||
    totalQuestions <= 0
  ) {
    return {
      valid: false,
      message:
        "Invalid or missing totalQuestions. It should be a positive number.",
    };
  }
};
