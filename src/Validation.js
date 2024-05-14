import z from "zod";

// Define a schema for the username
const usernameSchema = z
  .string()
  .min(4)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/);

export const validateUsername = (username) => {
  try {
    usernameSchema.parse(username);
    return true;
  } catch (error) {
    return false;
  }
};

// -------------------------------------------------

// Define a schema for the password
const passwordSchema = z
  .string()
  .min(6)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);

export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch (error) {
    return false;
  }
};
