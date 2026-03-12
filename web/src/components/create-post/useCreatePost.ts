import { FormEvent, useRef } from "react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";

import { CREATE_POST } from "./mutation";

export function useCreatePost() {
  const postContentRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);
  const [createPost, { loading }] = useMutation(CREATE_POST);

  async function onCreatePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const postContentValue = postContentRef.current.value;

    try {
      await createPost({
        variables: {
          body: {
            content: postContentValue,
          },
        },
      });

      toast.success("Post criado com sucesso!", {
        dismissible: true,
      });
    } catch {
      toast.error("Erro ao criar o post. Tente novamente", {
        dismissible: true,
      });
    }
  }

  return {
    postContentRef,
    loading,
    onCreatePostSubmit,
  };
}
