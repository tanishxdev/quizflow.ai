import { loginUser } from "./auth.service.js";
import { successResponse } from "../utils/response.js";
import { validateLoginInput } from "./auth.validator.js";

export const login = async (req, res, next) => {
  try {
    validateLoginInput(req.body);
    const { email, name } = req.body;

    const token = await loginUser({ email, name });

    return successResponse(res, { token });
  } catch (err) {
    next(err);
  }
};
