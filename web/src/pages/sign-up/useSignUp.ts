import { useRef } from "react";

export function useSignUp() {
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  return {
    nameRef,
    emailRef,
    passwordRef,
  };
}
