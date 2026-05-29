import { useRef, useState } from "react";
import { useMutation } from "@apollo/client/react";

import { UPDATE_PROFILE } from "./mutation";

export function useUpdateProfile() {
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const bioRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);

  function onUpdateProfileSubmit() { }

  function toggleShowHidePassword(): void {
    setIsPasswordVisible(prevState => !prevState);
  }

  return {
    nameRef,
    bioRef,
    passwordRef,
    isPasswordVisible,
    loading,
    onUpdateProfileSubmit,
    toggleShowHidePassword,
  }
}