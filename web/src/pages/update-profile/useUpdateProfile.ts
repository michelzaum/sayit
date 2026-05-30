import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

import { UPDATE_PROFILE } from "./mutation";
import { GET_LOGGED_USER } from "@/graphql/queries/getLoggedUser";

const schema = z.object({
  name: z
    .string()
    .min(1)
    .refine((name) => !/\d/.test(name), { error: "Nome invalido" }),
  bio: z.string(),
  password: z
    .string()
    .refine((val) => val === "" || (val.length >= 8 && val.length <= 16), {
      message: "Senha invalida. Minimo 8 caracteres e maximo 16",
    }),
});

type UserInfo = {
  getLoggedUser: {
    bio: string;
    name: string;
    password: string;
  }
}

export function useUpdateProfile() {
  const { id } = useParams<{ id: string }>();
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const bioRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
  const { data, loading: loadingUserInfo } = useQuery<UserInfo>(GET_LOGGED_USER, { fetchPolicy: 'network-only' });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      nameRef.current.value = data.getLoggedUser.name;
      bioRef.current.value = data.getLoggedUser.bio;
    }
  }, [data]);

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
    loadingUserInfo,
    data,
    onUpdateProfileSubmit,
    toggleShowHidePassword,
  }
}