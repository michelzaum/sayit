import { CreatePost } from "../../components/create-post";
import { PostItem } from "../../components/postItem";
import { mockPosts } from "./mock";

export function Feed() {
  const posts = mockPosts;

  return (
    <div className="flex justify-center mt-10 px-6">
      <div className="w-full sm:max-w-xl flex flex-col gap-12">
        <CreatePost authorName="Michel" />

        <div className="flex flex-col gap-4 py-3">
          <span className="text-base font-medium">Posts recentes</span>
          {posts.map((post) => (
            <PostItem
              id={post.id}
              authorImage={post.authorImage}
              authorName={post.authorName}
              createdAt={post.createdAt}
              postContent={post.postContent}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
