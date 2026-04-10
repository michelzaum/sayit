import { Loader } from "lucide-react";

import { CreatePost } from "../../components/create-post";
import { PostItem } from "../../components/postItem";

import { useFeed } from "./useFeed";

export function Feed() {
  const { loading, feedPostsList } = useFeed();

  return (
    <div className="flex justify-center mt-10 px-6">
      <div className="w-full sm:max-w-xl flex flex-col gap-12">
        <CreatePost authorName="Michel" />

        <div className="flex flex-col gap-4 py-3">
          <span className="text-base font-medium">Posts recentes</span>
          {!loading ? (
            feedPostsList.map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                authorImage={""}
                authorName={post.author.name}
                createdAt={post.createdAt}
                postContent={post.content}
                likesCount={post.likes.length}
                commentsCount={post.comments.length}
              />
            ))
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center p-10">
              <Loader size={24} className="animate-spin" />
              <span>Carregando posts...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
