import { describe, expect, it } from "vitest";
import { validateEmail } from "./useSignIn";

describe("Email validation", () => {
  it("should return false for empty email", () => {
    const emptyEmail = "";

    expect(validateEmail(emptyEmail)).toBe(false);
  });

  it.each(["invalid", "invalid@", "@domain.com"])(
    "should return false for invalid email format: $0",
    (invalidValues) => {
      expect(validateEmail(invalidValues)).toBe(false);
    },
  );

  it.each(["test@example.com", "user.name@domain.org"])(
    "should return true for valid email format: $0",
    (validValues) => {
      expect(validateEmail(validValues)).toBe(true);
    },
  );
});
