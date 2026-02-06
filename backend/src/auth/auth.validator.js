// src/auth/auth.validator.js

export const validateLoginInput = (data) => {
  const { email, name } = data;

  // email
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("Valid email is required for login.");
  }

  // name (optional but must be string if present)
  if (name && typeof name !== "string") {
    throw new Error("Name must be a string.");
  }
};
