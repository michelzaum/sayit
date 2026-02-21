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
    <div className="p-4 border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>{authorImage}</div>
          <span className="text-xs font-medium">{authorName}</span>
        </div>
        <span>👍️</span>
      </div>
      <span className="text-[10px] text-gray-500">{createdAt.toString()}</span>
      <div className="py-4">
        <span className="text-xs font-medium">{postContent}</span>
      </div>

      <div className="h-px w-full bg-gray-300"></div>

      <div className="flex items-center gap-2 py-4">
        <div className="flex items-center gap-1">
          <span>👍️</span>
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬️</span>
          <span>{commentsCount}</span>
        </div>
      </div>

      <form className="flex flex-col items-end gap-3">
        <textarea
          name="comment"
          id="comment"
          placeholder="Escreva um comentario"
          className="border border-gray-300 text-xs rounded-lg p-3 w-full resize-none"
        ></textarea>
        <button
          type="button"
          className="text-xs font-medium bg-blue-950 text-white p-3 rounded-lg"
        >
          Comentar
        </button>
      </form>
    </div>
  );
}
