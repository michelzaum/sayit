import { describe, expect, it, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import { toast } from "sonner";
import { renderHook } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";

import { useSign, validateEmail } from "./useSignIn";

const mockNavigate = vi.fn();
const mockSignIn = vi.fn();

vi.mock("react-router", async () => {
  const actual = (await vi.importActual("react-router")) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@apollo/client/react", async () => {
  const actual = (await vi.importActual("@apollo/client/react")) as object;
  return {
    ...actual,
    useMutation: () => [mockSignIn, {}],
  };
});

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

  it("should call signIn mutation when email and password are valid", async () => {
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

    result.current.emailRef.current = {
      value: "valid@mail.com",
    } as HTMLInputElement;
    result.current.passwordRef.current = {
      value: "password",
    } as HTMLInputElement;

    await result.current.onSignInSubmit(event);

    expect(mockSignIn).toHaveBeenCalled();
  });

  it("should call toast.error if signIn mutation call fail", async () => {
    const errorSpy = vi.spyOn(toast, "error");

    mockSignIn.mockRejectedValueOnce(new Error());

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

    result.current.emailRef.current = {
      value: "valid@mail.com",
    } as HTMLInputElement;
    result.current.passwordRef.current = {
      value: "password",
    } as HTMLInputElement;

    await result.current.onSignInSubmit(event);

    expect(errorSpy).toHaveBeenCalledWith("Erro ao fazer login. Tente novamente");
  });
});
