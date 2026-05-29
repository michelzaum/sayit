import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import { UPDATE_PROFILE } from "./mutation";

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

export function useUpdateProfile() {
  const { id } = useParams<{ id: string }>();
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const bioRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
  const navigate = useNavigate();

  function toggleShowHidePassword(): void {
    setIsPasswordVisible(prevState => !prevState);
  }

  function displayFormFieldErrorMessage(error: z.ZodError) {
    error.issues.forEach((issue) => {
      toast.error(issue.message);
    });
  }

  async function onUpdateProfileSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const nameValue = nameRef.current.value;
    const bioValue = bioRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!nameValue || !bioValue || !passwordValue) {
      return;
    }

    const { error } = schema.safeParse({
      bio: bioValue,
      name: nameValue,
      password: passwordValue,
    });

    if (error) {
      displayFormFieldErrorMessage(error);
      return;
    }

    try {
      await updateProfile({
        variables: {
          updateUserId: id,
          body: {
            name: nameValue,
            bio: bioValue,
            password: passwordValue,
          },
        },
      });

      navigate(`/profile/${id}`);
      toast.success("Perfil atualizado com sucesso!", {
        dismissible: true,
      });
    } catch (error: any) {
      if (error instanceof CombinedGraphQLErrors) {
        toast.error(error.message);
        return;
      }

      toast.error("Ocorreu um erro ao atualizar o perfil. Tente novamente");
    }
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