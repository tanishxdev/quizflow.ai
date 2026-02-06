export const validateAttemptIdParam = (attemptId) => {
  if (
    !attemptId ||
    typeof attemptId !== "string" ||
    attemptId.trim().length === 0
  ) {
    throw new Error(
      "attemptId parameter is required and must be a valid string.",
    );
  }
};
