import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing/react";

import { useSign, validateEmail } from "./useSignIn";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = (await vi.importActual("react-router")) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { afterEach } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
});


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

describe("Submit", () => {
  it("should not call navigate if email is invalid", async () => {
    const event = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    const { result } = renderHook(() => useSign(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={[]}>
          <MemoryRouter>{children}</MemoryRouter>
        </MockedProvider>
      ),
    });

    result.current.emailRef.current = { value: "invalid" } as HTMLInputElement;
    result.current.passwordRef.current = {
      value: "password",
    } as HTMLInputElement;

    await result.current.onSignInSubmit(event);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
