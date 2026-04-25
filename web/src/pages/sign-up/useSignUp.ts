import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import { CREATE_USER } from "./mutation";

const schema = z.object({
  name: z
    .string()
    .min(1)
    .refine((name) => !/\d/.test(name), { error: "Nome invalido" }),
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

export function useSignUp() {
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  function displayFormFieldErrorMessage(error: z.ZodError) {
    error.issues.forEach((issue) => {
      toast.error(issue.message);
    });
  }

  async function onRegisterSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!nameValue || !emailValue || !passwordValue) {
      return;
    }

    const { error } = schema.safeParse({
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    });

    if (error) {
      displayFormFieldErrorMessage(error);
      return;
    }

    try {
      await createUser({
        variables: {
          body: {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          },
        },
      });

      navigate("/sign-in");
      toast.success("Usúario criado com sucesso! Faça login", {
        dismissible: true,
      });
    } catch (error: any) {
      if (error instanceof CombinedGraphQLErrors) {
        toast.error(error.message);
        return;
      }

      toast.error("Ocorreu um erro ao criar usúario. Tente novamente");
    }
  }

  return {
    nameRef,
    emailRef,
    passwordRef,
    loading,
    onRegisterSubmit,
  };
}
