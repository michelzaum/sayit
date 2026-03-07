import { useRef } from "react";

export function useSign() {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  return {
    emailRef,
    passwordRef,
  };
}
