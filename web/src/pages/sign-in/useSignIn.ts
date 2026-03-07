import { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { SIGN_IN } from "./mutation";

interface SignInResponse {
  signIn: {
    accessToken: string;
  };
}

export function useSign() {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [signIn, { loading }] = useMutation<SignInResponse>(SIGN_IN);

  async function onSignInSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      const { data } = await signIn({
        variables: {
          body: {
            email: emailValue,
            password: passwordValue,
          },
        },
      });

      console.log(data.signIn.accessToken);
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
