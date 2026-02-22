import { PostItem } from "../../components/postItem";
import { PostProps } from "./types";

export function PostDetails({
  authorImage,
  authorName,
  postContent,
  createdAt,
  commentsCount,
  likesCount,
  comments,
}: PostProps) {
  return (
    <div className="flex flex-col p-6 gap-10">
      <div>
        <span>back</span>
        <span>voltar</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-2xl">Postagem de John Doe</span>
        <PostItem
          authorImage={authorImage}
          authorName={authorName}
          createdAt={createdAt}
          postContent={postContent}
          likesCount={likesCount}
          commentsCount={commentsCount}
        />

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

      <div className="flex flex-col gap-4">
        <span>Comentarios</span>
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div className="border border-gray-300 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>{comment.authorImage}</span>
                  <span className="text-xs font-medium">{comment.author}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {comment.createdAt.toString()}
                </span>
              </div>
              <div className="py-4">
                <span className="text-xs font-medium">{comment.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
