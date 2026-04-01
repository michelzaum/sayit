import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POST } from "./query";
import { GetPostData } from "./types";
import { CREATE_COMMENT } from "./mutations/createComment";
import { UPDATE_COMMENT } from "./mutations/updateComment";

export function usePostDetails() {
  const newCommentRef = useRef({} as HTMLTextAreaElement);
  const updatedCommentRef = useRef({} as HTMLTextAreaElement);
  const [searchParams] = useSearchParams();
  const [isUpdateCommentModalOpen, setIsUpdateCommentModalOpen] =
    useState(false);
  const [updatedCommentId, setUpdatedCommentId] = useState("");
  const [updatedCommentContent, setUpdatedCommentContent] = useState("");
  const postId = searchParams.get("postId");
  const [getPost, { data, loading, error }] =
    useLazyQuery<GetPostData>(GET_POST);
  const [createComment, { loading: createCommentLoading }] =
    useMutation(CREATE_COMMENT);
  const [updateComment, { loading: updateCommentLoading }] =
    useMutation(UPDATE_COMMENT);

  useEffect(() => {
    async function handleGetPost() {
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

    handleGetPost();
  }, [getPost, postId]);

  function openUpdateCommentModal(
    commentId: string,
    updateCommentContent: string,
  ) {
    setUpdatedCommentId(commentId);
    setUpdatedCommentContent(updateCommentContent);
    setIsUpdateCommentModalOpen(true);
  }

  function closeUpdateCommentModal() {
    setIsUpdateCommentModalOpen(false);
  }

  async function handleUpdateComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updateCommentValue = updatedCommentRef.current.value;

    try {
      await updateComment({
        variables: {
          commentId: updatedCommentId,
          newContent: updateCommentValue,
        },
      });

      closeUpdateCommentModal();
      toast.success("Comentário atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar comentário. Tente novamente");
    }
  }

  async function handleAddComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newCommentValue = newCommentRef.current.value;

    if (!newCommentValue) {
      return;
    }

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
    updatedCommentRef,
    updatedCommentContent,
    isUpdateCommentModalOpen,
    updateCommentLoading,
    openUpdateCommentModal,
    closeUpdateCommentModal,
    handleAddComment,
    handleUpdateComment,
  };
}
