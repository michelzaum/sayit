import { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { z } from "zod";

import { SIGN_IN } from "./mutation";

const schema = z.object({
  email: z.email({ error: "E-mail invalido" }),
  password: z
    .string()
    .min(8, {
      error: "Senha invalida. Minimo 8 caracteres e maximo 16",
    })
    .max(16, {
      error: "Senha invalida. Minimo 8 caracteres e maximo 16",
    }),
});

export function useSign() {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [signIn, { loading }] = useMutation(SIGN_IN);
  const navigate = useNavigate();

  function displayFormFieldErrorMessage(error: z.ZodError) {
    error.issues.forEach((issue) => {
      toast.error(issue.message);
    });
  }

  async function onSignInSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordValue) {
      return;
    }

    const { error } = schema.safeParse({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      displayFormFieldErrorMessage(error);
      return;
    }

    try {
      await signIn({
        variables: {
          body: {
            email: emailValue,
            password: passwordValue,
          },
        },
      });

      navigate("/", { replace: true });
      toast.success("Bem vindo de volta!");
    } catch {
      toast.error("Erro ao fazer login. Tente novamente");
    }
  }

  return {
    emailRef,
    passwordRef,
    loading,
    onSignInSubmit,
  };
}
