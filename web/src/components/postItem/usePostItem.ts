import dayjs from "dayjs";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "@apollo/client/react";
import { DELETE_POST } from "./mutation/deletePost";
dayjs.extend(relativeTime);

export function usePostItem() {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [deletePost, { error, loading }] = useMutation(DELETE_POST);

  function toggleLike(): void {
    setIsPostLiked((prevState) => !prevState);
  }

  function formatPostDate(dateInNumber: string): string {
    return dayjs().to(dayjs(Number(dateInNumber)));
  }

  function handleDeletePost(postId: string) {
    console.log(postId);
  }

  return {
    isPostLiked,
    toggleLike,
    formatPostDate,
    handleDeletePost,
  };
}
