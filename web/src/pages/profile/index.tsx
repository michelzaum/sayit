import { User, UserPlus } from "lucide-react";

import { Header } from "@/components/header";
import { useProfile } from "./useProfile";
import { PostItem } from "@/components/postItem";

export function Profile() {
  const { userInfo, userPostsInfo } = useProfile();

  if (!userInfo || !userPostsInfo || !userPostsInfo.getAllPostsByAuthorId) {
    return;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="border rounded-full w-24 h-24 flex items-center justify-center">
              <User />
            </div>
            <h1 className="text-3xl">{userInfo.name}</h1>
            <span className="text-sm text-gray-400">Membro desde {userInfo.createdAt}</span>
          </div>
          <button type="button" className="flex items-center gap-4 py-4 px-6 border rounded-md hover:cursor-pointer hover:bg-gray-50 transition-all">
            <span>
              Seguir
            </span>
            <UserPlus />
          </button>
          <span>This is my bio, bro</span>
        </div>
        <div className="w-full flex justify-center p-6 mt-6 border-t">
          <div className="w-full max-w-xl flex flex-col gap-4">
            <span className="text-base font-medium">Posts</span>
            {userPostsInfo?.getAllPostsByAuthorId.length > 0 ? (
              userPostsInfo?.getAllPostsByAuthorId.map((post) => (
                <PostItem
                  key={post.id}
                  authorImage=""
                  authorName={userInfo.name}
                  commentsCount={post.comments.length}
                  createdAt={post.createdAt}
                  id={post.id}
                  likesCount={post.likes.length}
                  postContent={post.content}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-center p-4">
                <span>Nenhum post foi encontrado.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
