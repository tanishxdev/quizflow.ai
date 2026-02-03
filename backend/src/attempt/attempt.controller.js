import {
  createAttempt,
  recordAnswer,
  finalizeAttempt,
} from "./attempt.service.js";
import { successResponse } from "../utils/response.js";

export const startAttempt = async (req, res, next) => {
  try {
    const attempt = await createAttempt(req.user._id, req.params.quizId);

    return successResponse(res, {
      attemptId: attempt._id,
      startTime: attempt.startTime,
    });
  } catch (err) {
    next(err);
  }
};

export const saveAnswer = async (req, res, next) => {
  try {
    await recordAnswer(req.user._id, req.params.attemptId, req.body);

    return successResponse(res, { status: "saved" });
  } catch (err) {
    next(err);
  }
};

export const submitAttempt = async (req, res, next) => {
  try {
    await finalizeAttempt(req.user._id, req.params.attemptId);

    return successResponse(res, { status: "submitted" });
  } catch (err) {
    next(err);
  }
};
