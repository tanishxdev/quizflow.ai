import { createQuiz } from "./quiz.service.js";
import { validateQuizInput } from "./quiz.validator.js";
import { successResponse } from "../utils/response.js";

export const generateQuiz = async (req, res, next) => {
  try {
    validateQuizInput(req.body);

    const quiz = await createQuiz(req.user._id, req.body);

    return successResponse(res, {
      quizId: quiz._id,
      totalQuestions: quiz.totalQuestions,
    });
  } catch (err) {
    next(err);
  }
};

