import { FormEvent, useRef } from "react";
import { useMutation } from "@apollo/client/react";

import { CREATE_POST } from "./mutation";

export function useCreatePost() {
  const postContentRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);
  const [createPost, { loading }] = useMutation(CREATE_POST);

  async function onCreatePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const postContentValue = postContentRef.current.value;

    await createPost({
      variables: {
        body: {
          content: postContentValue,
        },
      },
    });
  }

  return {
    postContentRef,
    loading,
    onCreatePostSubmit,
  };
}
