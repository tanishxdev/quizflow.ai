import { buildResult } from "./result.service.js";
import { successResponse } from "../utils/response.js";

export const getResult = async (req, res, next) => {
  try {
    const result = await buildResult(req.user._id, req.params.attemptId);

    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};
