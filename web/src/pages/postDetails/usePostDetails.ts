import { FormEvent, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POST } from "./query";
import { GetPostData } from "./types";
import { CREATE_COMMENT } from "./mutation";

export function usePostDetails() {
  const newCommentRef = useRef({} as HTMLTextAreaElement);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [getPost, { data, loading, error }] =
    useLazyQuery<GetPostData>(GET_POST);
  const [createComment, { loading: createCommentLoading }] =
    useMutation(CREATE_COMMENT);

  useEffect(() => {
    async function handleGetPosts() {
      try {
        await getPost({
          variables: {
            postId,
          },
        });
      } catch {
        toast.error("Erro ao carregar post. Tente novamente");
      }
    }

    handleGetPosts();
  }, [getPost, postId]);

  async function handleAddComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newCommentValue = newCommentRef.current.value;

    try {
      await createComment({
        variables: {
          postId,
          content: newCommentValue,
        },
      });

      toast.success("Comentário adicionado com sucesso!");
    } catch {
      toast.error("Erro ao adicionar comentário. Tente novamente");
    }
  }

  return {
    data,
    loading,
    error,
    createCommentLoading,
    newCommentRef,
    handleAddComment,
  };
}
