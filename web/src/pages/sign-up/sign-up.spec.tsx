import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { MemoryRouter } from 'react-router';
import { toast } from 'sonner';

import { useSignUp } from './useSignUp';

const mockNavigate = vi.fn();
const mockSignUp = vi.fn();

vi.mock('react-router', async () => {
  const actual = (await vi.importActual("react-router")) as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
});

vi.mock("@apollo/client/react", async () => {
  const actual = (await vi.importActual("@apollo/client/react")) as object;
  return {
    ...actual,
    useMutation: () => [mockSignUp, {}],
  };
});

describe('onRegisterSubmit', () => {
  const event = {
    preventDefault: vi.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>;

  const { result } = renderHook(() => useSignUp(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={[]}>
        <MemoryRouter>{children}</MemoryRouter>
      </MockedProvider>
    )
  });

  it('should not call navigate if name is empty', async () => {
    result.current.nameRef.current = { value: "" } as HTMLInputElement;
    result.current.emailRef.current = { value: "john@mail.com" } as HTMLInputElement;
    result.current.passwordRef.current = { value: "password" } as HTMLInputElement;

    await result.current.onRegisterSubmit(event);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not call navigate if email is empty', async () => {
    result.current.nameRef.current = { value: "John" } as HTMLInputElement;
    result.current.emailRef.current = { value: "" } as HTMLInputElement;
    result.current.passwordRef.current = { value: "password" } as HTMLInputElement;

    await result.current.onRegisterSubmit(event);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not call navigate if email is empty', async () => {
    result.current.nameRef.current = { value: "John" } as HTMLInputElement;
    result.current.emailRef.current = { value: "john@mail.com" } as HTMLInputElement;
    result.current.passwordRef.current = { value: "" } as HTMLInputElement;

    await result.current.onRegisterSubmit(event);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should call navigate if all fields information were provided', async () => {
    result.current.nameRef.current = { value: "John" } as HTMLInputElement;
    result.current.emailRef.current = { value: "john@mail.com" } as HTMLInputElement;
    result.current.passwordRef.current = { value: "password" } as HTMLInputElement;

    await result.current.onRegisterSubmit(event);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it.each(['123', 'john123', '123john', '@#!', 'J0hn'])
    ('should call toast error message if name is invalid: $0', async (value) => {
      const errorSpy = vi.spyOn(toast, 'error');

      mockSignUp.mockRejectedValue(new Error());

      result.current.nameRef.current = { value } as HTMLInputElement;
      result.current.emailRef.current = { value: "john@mail.com" } as HTMLInputElement;
      result.current.passwordRef.current = { value: "password" } as HTMLInputElement;

      await result.current.onRegisterSubmit(event);

      expect(errorSpy).toHaveBeenCalledWith('Nome invalido')
    });

  it.each(['123', '1234567', '12345678900987654321', 'test', 'testtesttest'])
    ('should call toast error message if password is invalid: $0', async (value) => {
      const errorSpy = vi.spyOn(toast, 'error');

      mockSignUp.mockRejectedValue(new Error());

      result.current.nameRef.current = { value: 'John' } as HTMLInputElement;
      result.current.emailRef.current = { value: "john@mail.com" } as HTMLInputElement;
      result.current.passwordRef.current = { value } as HTMLInputElement;

      await result.current.onRegisterSubmit(event);

      expect(errorSpy).toHaveBeenCalledWith('Senha invalida. Minimo 8 caracteres e maximo 16')
    });

  it.each(['test', 'test@', '@.com', 'test.com', '.'])
    ('should call toast error message if email is invalid: $0', async (value) => {
      const errorSpy = vi.spyOn(toast, 'error');

      mockSignUp.mockRejectedValue(new Error());

      result.current.nameRef.current = { value: 'John' } as HTMLInputElement;
      result.current.emailRef.current = { value } as HTMLInputElement;
      result.current.passwordRef.current = { value: '12345678' } as HTMLInputElement;

      await result.current.onRegisterSubmit(event);

      expect(errorSpy).toHaveBeenCalledWith('E-mail invalido')
    });
});