import { useMutation } from "@apollo/client/react";
import { useRef, useState } from "react";

export function useUpdateProfile() {
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const bioRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [createUser, { loading }] = useMutation(CREATE_USER);

  function onUpdateProfileSubmit() { }

  function toggleShowHidePassword(): void {
    setIsPasswordVisible(prevState => !prevState);
  }

  return {
    nameRef,
    bioRef,
    passwordRef,
    isPasswordVisible,
    onUpdateProfileSubmit,
    toggleShowHidePassword,
  }
}