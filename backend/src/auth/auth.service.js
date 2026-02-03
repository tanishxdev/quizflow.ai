import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const loginUser = async ({ email, name }) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return token;
};
