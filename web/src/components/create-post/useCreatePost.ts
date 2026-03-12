import { FormEvent, useRef } from "react";

export function useCreatePost() {
  const postContentRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  async function onCreatePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const postContentValue = postContentRef.current.value;

    console.log(postContentValue);
  }

  return {
    postContentRef,
    onCreatePostSubmit,
  };
}
