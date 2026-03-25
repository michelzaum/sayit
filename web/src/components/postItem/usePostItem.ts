import dayjs from "dayjs";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { DELETE_POST } from "./mutation/deletePost";
dayjs.extend(relativeTime);

export function usePostItem() {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [deletePost, { loading }] = useMutation(DELETE_POST);

  function toggleLike(): void {
    setIsPostLiked((prevState) => !prevState);
  }

  function formatPostDate(dateInNumber: string): string {
    return dayjs().to(dayjs(Number(dateInNumber)));
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
  }

  return {
    isPostLiked,
    toggleLike,
    formatPostDate,
    handleDeletePost,
  };
}
