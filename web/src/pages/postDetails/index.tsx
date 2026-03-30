import { Link } from "react-router";
import { ArrowLeftIcon, Loader, User2 } from "lucide-react";

import { PostItem } from "../../components/postItem";
import { usePostDetails } from "./usePostDetails";
import { formatRelativeDate } from "@/shared/formatRelativeDate";

export function PostDetails() {
  const {
    data,
    loading,
    newCommentRef,
    createCommentLoading,
    handleAddComment,
  } = usePostDetails();

  if (!data) {
    return;
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center p-10">
        <Loader size={24} className="animate-spin" />
        <span>Carregando post...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-full sm:max-w-xl flex flex-col gap-10">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeftIcon />
          <span>voltar</span>
        </Link>
        <div className="flex flex-col gap-4">
          <span className="text-2xl">
            Postagem de {data.getPost.author.name}
          </span>
          <PostItem
            id={data.getPost.id}
            authorImage={""}
            authorName={data.getPost.author.name}
            createdAt={data.getPost.createdAt}
            postContent={data.getPost.content}
            likesCount={data.getPost.likesCount}
            commentsCount={data.getPost.commentsCount}
          />

          <form
            className="flex flex-col items-end gap-3"
            onSubmit={handleAddComment}
          >
            <textarea
              ref={newCommentRef}
              name="comment"
              id="comment"
              placeholder="Escreva um comentario"
              className="border border-gray-300 text-xs rounded-lg p-3 w-full resize-none"
            ></textarea>
            <button
              type="submit"
              className="text-xs font-medium bg-blue-950 text-white p-3 rounded-lg disabled:bg-gray-400"
              disabled={createCommentLoading}
            >
              {createCommentLoading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <span>Comentar</span>
              )}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <span>Comentarios</span>
          {data.getPost.comments.length === 0 ? (
            <div className="flex justify-center p-3">
              <span>Esse post ainda não tem comentários.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {data.getPost.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-300 p-4 rounded-lg"
                >
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full p-1 border border-gray-400">
                        <User2
                          className="text-gray-400"
                          height={18}
                          width={18}
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {comment.author.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatRelativeDate(comment.createdAt.toString())}
                    </span>
                  </div>
                  <div className="py-4">
                    <span className="text-xs font-medium">
                      {comment.content}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
