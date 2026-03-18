import { Link } from "react-router";
import { Heart, MessageSquare, User2 } from "lucide-react";

import { PostProps } from "./types";
import { usePostItem } from "./usePostItem";

export function PostItem({
  authorName,
  authorImage,
  createdAt,
  commentsCount,
  likesCount,
  postContent,
}: PostProps) {
  const { isPostLiked, formatPostDate, toggleLike } = usePostItem();

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full p-1 border border-gray-400">
            {authorImage ? (
              <img src={authorImage} alt="User profile image" />
            ) : (
              <User2 className="text-gray-400" height={18} width={18} />
            )}
          </div>
          <span className="text-xs font-medium">{authorName}</span>
        </div>
        <button className="hover:cursor-pointer" onClick={toggleLike}>
          <Heart
            height={32}
            width={32}
            className={`${isPostLiked ? "fill-red-500 stroke-red-500" : "bg-transparent stroke-1 stroke-gray-400"}`}
          />
        </button>
      </div>
      <span className="text-[10px] text-gray-500">
        {formatPostDate(createdAt.toString())}
      </span>
      <Link to="/postDetails" className="py-4 block">
        <span className="text-xs font-medium">{postContent}</span>
      </Link>

      <div className="h-px w-full bg-gray-300"></div>

      <div className="flex items-center gap-3 py-4">
        <div className="flex items-center gap-2">
          <Heart height={18} width={18} />
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare height={18} width={18} />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
}
