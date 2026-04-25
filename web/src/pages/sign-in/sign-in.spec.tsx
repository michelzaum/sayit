import { describe, expect, it, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import { toast } from "sonner";
import { renderHook } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";

import { useSign } from "./useSignIn";

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

describe("Submit", () => {
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

  it.each(["invalid", "", "test.", "test.com", "@", "@.@"])(
    "should not call navigate and signIn if email is invalid: $0",
    async (values) => {
      result.current.emailRef.current = { value: values } as HTMLInputElement;
      result.current.passwordRef.current = {
        value: "password",
      } as HTMLInputElement;

      await result.current.onSignInSubmit(event);

      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockSignIn).not.toHaveBeenCalled();
    },
  );

  it("should call signIn mutation when email and password are valid", async () => {
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

    result.current.emailRef.current = {
      value: "valid@mail.com",
    } as HTMLInputElement;
    result.current.passwordRef.current = {
      value: "password",
    } as HTMLInputElement;

    await result.current.onSignInSubmit(event);

    expect(errorSpy).toHaveBeenCalledWith(
      "Erro ao fazer login. Tente novamente",
    );
  });
});
