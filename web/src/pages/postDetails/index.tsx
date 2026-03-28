import { Link } from "react-router";
import { ArrowLeftIcon, Loader } from "lucide-react";

import { PostItem } from "../../components/postItem";
import { usePostDetails } from "./usePostDetails";

const post = {
  id: "1",
  authorImage: "",
  authorName: "John Doe",
  createdAt: new Date(),
  postContent: "Um Post bem legal feito pelo John doe a 1 hora atras.",
  likesCount: 10,
  commentsCount: 2,
  comments: [
    {
      id: 1,
      author: "John Doe 3",
      authorImage: "👨️",
      content: "Que post legal!",
      createdAt: new Date(),
    },
  ],
};

export function PostDetails() {
  const { data, loading, error } = usePostDetails();

  if (error) {
    return;
  }

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
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-300 p-4 rounded-lg"
              >
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-1">
                    <span>{comment.authorImage}</span>
                    <span className="text-xs font-medium">
                      {comment.author}
                    </span>
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
    </div>
  );
}
