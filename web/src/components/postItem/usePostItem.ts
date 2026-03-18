import dayjs from "dayjs";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function usePostItem() {
  const [isPostLiked, setIsPostLiked] = useState(false);

  function toggleLike(): void {
    setIsPostLiked((prevState) => !prevState);
  }

  function formatPostDate(dateInNumber: string): string {
    return dayjs().to(dayjs(Number(dateInNumber)));
  }

  return {
    isPostLiked,
    toggleLike,
    formatPostDate,
  };
}
