import { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { SIGN_IN } from "./mutation";

export function useSign() {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [signIn, { loading }] = useMutation(SIGN_IN);
  const navigate = useNavigate();

  async function onSignInSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

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
