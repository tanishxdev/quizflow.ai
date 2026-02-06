export const validateSubjectParam = (subject) => {
  if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
    throw new Error(
      "Subject parameter is required and must be a valid string.",
    );
  }
};
