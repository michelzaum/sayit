import { FormEvent, useEffect, useRef, useState } from "react";
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
    author: {
      id: string;
      name: string;
    };
  };
};

type CommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  author?: {
    id: string;
    name: string;
  };
};

type GetAllCommentsResponse = {
  getAllCommentsByPostId: CommentResponse[];
};

const EMPTY_COMMENTS: CommentResponse[] = [];

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
  const [getAllCommentsByPostId] =
    useLazyQuery<GetAllCommentsResponse>(GET_ALL_COMMENTS_BY_POST_ID, {
      fetchPolicy: "network-only",
    });
  const [createComment, { loading: createCommentLoading }] =
    useMutation<CreateCommentResponse>(CREATE_COMMENT, {
      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: "Post", id: postId }),
          fields: {
            commentsCount(existingCount = 0) {
              return existingCount + 1;
            },
          },
        });
      },
    });
  const [updateComment, { loading: updateCommentLoading }] =
    useMutation(UPDATE_COMMENT);
  const [deleteComment, { loading: deleteCommentLoading }] =
    useMutation(DELETE_COMMENT, {
      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: "Post", id: postId }),
          fields: {
            commentsCount(existingCount = 0) {
              return existingCount - 1;
            },
          },
        });
      },
    });

  const addPostComment = useStore((state) => state.addPostComment);
  const updatePostComment = useStore((state) => state.updatePostComment);
  const removePostComment = useStore((state) => state.removePostComment);
  const feedPostsList = useStore((state) => state.feedPostsList);
  const postDetails = feedPostsList.find((post) => post.id === postId);
  const loggedUserId = useStore((state) => state.loggedUserId);
  const postDetailsComments = useStore(
    (state) => state.commentsByPost[postId ?? ""] || EMPTY_COMMENTS,
  );
  const setPostDetailsComments = useStore(
    (state) => state.setPostDetailsComments,
  );

  const lastFetchedPostId = useRef<string | null>(null);
  useEffect(() => {
    async function handleGetComments() {
      if (!postId || lastFetchedPostId.current === postId) return;

      try {
        lastFetchedPostId.current = postId;
        const { data: commentsData } = await getAllCommentsByPostId({
          variables: {
            postId,
          },
        });

        if (commentsData) {
          setPostDetailsComments(postId, commentsData.getAllCommentsByPostId);
        }
      } catch {
        console.log("error");
        lastFetchedPostId.current = null; // Reset on error to allow retry
      }
    }

    handleGetComments();
  }, [postId, getAllCommentsByPostId, setPostDetailsComments]);

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

      if (postId) {
        updatePostComment(updatedCommentId, updateCommentValue, postId);
      }

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

      if (postId) {
        addPostComment({
          id: data.createComment.id,
          content: data.createComment.content,
          postId,
          author: {
            id: data.createComment.author.id,
            name: data.createComment.author.name,
          },
        });
      }
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

      if (postId) {
        removePostComment(deletedCommentId, postId);
      }

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
    loggedUserId,
  };
}
