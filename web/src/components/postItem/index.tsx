import { Link } from "react-router";
import { Heart, MessageSquare, User2 } from "lucide-react";

import { PostProps } from "./types";

export function PostItem({
  authorName,
  authorImage,
  createdAt,
  commentsCount,
  likesCount,
  postContent,
}: PostProps) {
  return (
    <Link to="/postDetails" className="p-4 border border-gray-300 rounded-lg">
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
        <button>
          <Heart className="text-gray-400" />
        </button>
      </div>
      <span className="text-[10px] text-gray-500">{createdAt.toString()}</span>
      <div className="py-4">
        <span className="text-xs font-medium">{postContent}</span>
      </div>

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
    </Link>
  );
}
