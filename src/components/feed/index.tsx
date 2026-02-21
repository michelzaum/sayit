import { CreatePost } from "../create-post";
import { Post } from "../post";

export function Feed() {
  return (
    <div className="flex flex-col gap-12 mt-10 px-6">
      <CreatePost authorName="Michel" />

      <div className="flex flex-col gap-4">
        <span className="text-base font-medium">Posts recentes</span>
        <Post
          authorImage="👨️"
          authorName="John Doe"
          createdAt={new Date()}
          postContent="Um Post bem legal feito pelo John doe a 1 hora atras."
          likesCount={8}
          commentsCount={2}
        />
      </div>
    </div>
  );
}
