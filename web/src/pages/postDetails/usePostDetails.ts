import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { CREATE_COMMENT } from "./mutations/createComment";
import { UPDATE_COMMENT } from "./mutations/updateComment";
import { DELETE_COMMENT } from "./mutations/deleteComment";
import { useStore } from "@/store/store";
import { GET_ALL_COMMENTS_BY_POST_ID } from "./queries/getAllCommentsByPostId";

type CreateCommentResponse = {
  createComment: {
    id: string;
    content: string;
  };
};

type CommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
};

type GetAllCommentsResponse = {
  getAllCommentsByPostId: CommentResponse[];
};

export function usePostDetails() {
  const newCommentRef = useRef({} as HTMLTextAreaElement);
  const updatedCommentRef = useRef({} as HTMLTextAreaElement);
  const [searchParams] = useSearchParams();
  const [isUpdateCommentModalOpen, setIsUpdateCommentModalOpen] =
    useState(false);
  const [updatedCommentId, setUpdatedCommentId] = useState("");
  const [deletedCommentId, setDeletedCommentId] = useState("");
  const [updatedCommentContent, setUpdatedCommentContent] = useState("");
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const postId = searchParams.get("postId");
  const [getAllCommentsByPostId, { data: postComments }] =
    useLazyQuery<GetAllCommentsResponse>(GET_ALL_COMMENTS_BY_POST_ID);
  const [createComment, { loading: createCommentLoading }] =
    useMutation<CreateCommentResponse>(CREATE_COMMENT);
  const [updateComment, { loading: updateCommentLoading }] =
    useMutation(UPDATE_COMMENT);
  const [deleteComment, { loading: deleteCommentLoading }] =
    useMutation(DELETE_COMMENT);

  const addPostComment = useStore((state) => state.addPostComment);
  const feedPostsList = useStore((state) => state.feedPostsList);
  const postDetails = feedPostsList.find((post) => post.id === postId);
  const postDetailsComments = useStore((state) => state.postDetailsComments);
  const setPostDetailsComments = useStore(
    (state) => state.setPostDetailsComments,
  );

  useLayoutEffect(() => {
    async function handleGetComments() {
      try {
        await getAllCommentsByPostId({
          variables: {
            postId,
          },
        });

        setPostDetailsComments(postComments);
      } catch {
        console.log("error");
      }
    }

    handleGetComments();
  }, [postId, getAllCommentsByPostId, postComments, setPostDetailsComments]);

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

  function closeDeleteCommentModal() {
    setIsDeleteCommentModalOpen(false);
  }

  function openDeleteCommentModal(commentId: string) {
    setDeletedCommentId(commentId);
    setIsDeleteCommentModalOpen(true);
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
      const { data } = await createComment({
        variables: {
          postId,
          content: newCommentValue,
        },
      });

      addPostComment({
        id: data.createComment.id,
        content: data.createComment.content,
        postId,
      });
      newCommentRef.current.value = "";
      toast.success("Comentário adicionado com sucesso!");
    } catch {
      toast.error("Erro ao adicionar comentário. Tente novamente");
    }
  }

  async function handleDeleteComment() {
    try {
      await deleteComment({
        variables: {
          commentId: deletedCommentId,
        },
      });

      toast.success("Comentário excluído com sucesso!");
    } catch {
      toast.error("Erro ao excluir comentário. Tente novemente");
    }

    closeDeleteCommentModal();
  }

  return {
    postDetails,
    postDetailsComments,
    createCommentLoading,
    newCommentRef,
    updatedCommentRef,
    updatedCommentContent,
    isUpdateCommentModalOpen,
    isDeleteCommentModalOpen,
    updateCommentLoading,
    deleteCommentLoading,
    openUpdateCommentModal,
    closeUpdateCommentModal,
    closeDeleteCommentModal,
    openDeleteCommentModal,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  };
}
