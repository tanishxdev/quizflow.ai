import { loginUser } from "./auth.service.js";
import { successResponse } from "../utils/response.js";

export const login = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const token = await loginUser({ email, name });

    return successResponse(res, { token });
  } catch (err) {
    next(err);
  }
};
