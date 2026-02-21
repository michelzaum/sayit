import { PostItem } from "../postItem";

export function PostDetails() {
  const post = {
    authorImage: "👨️",
    authorName: "John Doe",
    createdAt: new Date(),
    postContent: "Um Post bem legal feito pelo John doe a 1 hora atras.",
    likesCount: 10,
    commentsCount: 2,
  };

  return (
    <div className="flex flex-col p-6 gap-10">
      <div>
        <span>back</span>
        <span>voltar</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-2xl">Postagem de John Doe</span>
        <PostItem
          authorImage={post.authorImage}
          authorName={post.authorName}
          createdAt={post.createdAt}
          postContent={post.postContent}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
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
          <div className="border border-gray-300 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span>👨️</span>
                <span className="text-xs font-medium">John Doe</span>
              </div>
              <span className="text-xs text-gray-500">1 hora atras</span>
            </div>
            <div>
              <span className="text-xs font-medium">Que post legal!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
