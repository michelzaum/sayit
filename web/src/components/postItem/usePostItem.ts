import { FormEvent, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { DELETE_POST } from "./mutation/deletePost";
import { UPDATE_POST } from "./mutation/updatetePost";
import { CREATE_LIKE } from "./mutation/createLike";
dayjs.extend(relativeTime);

export function usePostItem() {
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);
  const [isPostLikedByUser, setIsPostLikedByUser] = useState(false);
  const [deletePost, { loading }] = useMutation(DELETE_POST);
  const [updatePost, { loading: updatePostLoading }] = useMutation(UPDATE_POST);
  const [createLike] = useMutation(CREATE_LIKE);
  const newPostContentRef = useRef<HTMLTextAreaElement>(
    {} as HTMLTextAreaElement,
  );

  function toggleLike(isPostLiked: boolean): void {
    setIsPostLikedByUser(isPostLiked);
  }

  async function handleCreateLike(postId: string) {
    try {
      await createLike({
        variables: {
          postId,
        },
      });
      toggleLike(true);
    } catch {
      toast.error("Erro ao salvar like. Tente novamente.");
    }
  }

  function openDeletePostModal(): void {
    setIsDeletePostModalOpen(true);
  }

  function closeDeletePostModal(): void {
    setIsDeletePostModalOpen(false);
  }

  function openUpdatePostModal(): void {
    setIsUpdatePostModalOpen(true);
  }

  function closeUpdatetePostModal(): void {
    setIsUpdatePostModalOpen(false);
  }

  async function handleUpdatePost(
    event: FormEvent<HTMLFormElement>,
    postId: string,
  ): Promise<void> {
    event.preventDefault();

    const newPostContentValue = newPostContentRef.current.value;

    try {
      await updatePost({
        variables: {
          updatePostId: postId,
          newContent: newPostContentValue,
        },
      });

      toast.success("Post atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar post. Tente novamente");
    }

    closeUpdatetePostModal();
  }

  async function handleDeletePost(postId: string) {
    try {
      await deletePost({
        variables: {
          deletePostId: postId,
        },
      });

      toast.success("Post excluído com sucesso!");
    } catch {
      toast.error("Erro ao excluir post. Tente novamente");
    }

    closeDeletePostModal();
  }

  return {
    isPostLikedByUser,
    isDeletePostModalOpen,
    isUpdatePostModalOpen,
    loading,
    updatePostLoading,
    newPostContentRef,
    // toggleLike,
    handleCreateLike,
    handleDeletePost,
    handleUpdatePost,
    openDeletePostModal,
    closeDeletePostModal,
    openUpdatePostModal,
    closeUpdatetePostModal,
  };
}
