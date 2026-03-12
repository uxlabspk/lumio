import bcrypt from "bcryptjs";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export function validatePassword(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
    };
  }

  if (!PASSWORD_PATTERN.test(password)) {
    return {
      isValid: false,
      message:
        "Password must include at least one uppercase letter, one lowercase letter, and one number.",
    };
  }

  return {
    isValid: true,
    message: "Password is valid.",
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}