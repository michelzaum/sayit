import { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router";

import { CREATE_USER } from "./mutation";

export function useSignUp() {
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  async function onRegisterSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

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
  }

  return {
    nameRef,
    emailRef,
    passwordRef,
    loading,
    onRegisterSubmit,
  };
}
