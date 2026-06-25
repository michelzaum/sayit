import { Link } from "react-router";
import { Edit2, Loader, User } from "lucide-react";

import { Header } from "@/components/header";
import { useProfile } from "./useProfile";
import { PostItem } from "@/components/postItem";
import { Follow } from "./components/FollowUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Profile() {
  const {
    id,
    isLoggedUserFollowing,
    isUnFollowUserModalOpen,
    userInfo,
    userPostsInfo,
    userRelationInfo,
    getUserProfileInfoLoading,
    getAllPostsByAuthorIdLoading,
    getUserRelationsLoading,
    handleIsLoggedUserFollowingLoading,
    closeUnFollowUserModal,
    handleUnFollowUser,
    handleFollowUser,
    openUnFollowUserModal,
  } = useProfile();

  if (
    !userInfo ||
    !userPostsInfo ||
    !userPostsInfo.getAllPostsByAuthorId ||
    !userRelationInfo
  ) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center p-10">
        <Loader size={24} className="animate-spin" />
        <span>Carregando informações do perfil...</span>
      </div>
    );
  }

  return (
    <>
      {getUserProfileInfoLoading ||
      getAllPostsByAuthorIdLoading ||
      getUserRelationsLoading ||
      handleIsLoggedUserFollowingLoading ? (
        <div className="flex flex-col gap-4 items-center justify-center p-10">
          <Loader size={24} className="animate-spin" />
          <span>Carregando informações do perfil...</span>
        </div>
      ) : (
        <>
          <Header />
          <div className="flex flex-col items-center mt-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="border rounded-full w-24 h-24 flex items-center justify-center">
                  <User />
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl">{userInfo.userInfo.name}</h1>
                  {userInfo.canEdit && (
                    <Link
                      to={`/update-profile/${id}`}
                      type="button"
                      className="hover:cursor-pointer"
                    >
                      <Edit2 />
                    </Link>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  Membro desde {userInfo.userInfo.createdAt}
                </span>
              </div>
              <div className="flex items-center gap-14 py-4">
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 hover:cursor-pointer"
                >
                  <span className="font-bold">
                    {userRelationInfo.followers.length}
                  </span>
                  <span>Seguidores</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 hover:cursor-pointer"
                >
                  <span className="font-bold">
                    {userRelationInfo.following.length}
                  </span>
                  <span>Seguindo</span>
                </button>
              </div>
              {!userInfo.canEdit && (
                <Follow
                  isLoggedUserFollowing={isLoggedUserFollowing}
                  handleUnFollowUser={openUnFollowUserModal}
                  handleFollowUser={handleFollowUser}
                />
              )}
              <span>{userInfo.userInfo.bio}</span>
            </div>
            <div className="w-full flex justify-center p-6 mt-6 border-t">
              <div className="w-full max-w-xl flex flex-col gap-4">
                <span className="text-base font-medium">Posts</span>
                {userPostsInfo?.getAllPostsByAuthorId.length > 0 ? (
                  userPostsInfo?.getAllPostsByAuthorId.map((post) => (
                    <PostItem
                      key={post.id}
                      author={post.author}
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
          <Dialog open={isUnFollowUserModalOpen}>
            <DialogContent className="sm:max-w-sm" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle className="text-lg">
                  Deixar de seguir
                  <strong> {userInfo.userInfo.name}?</strong>
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Tem certeza que deseja deixar de seguir{" "}
                <strong>{userInfo.userInfo.name}?</strong>
              </DialogDescription>
              <button
                type="submit"
                className="bg-blue-950 disabled:bg-gray-400 text-gray-50 flex items-center justify-center font-medium py-4 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
                onClick={handleUnFollowUser}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="hover:cursor-pointer"
                onClick={closeUnFollowUserModal}
              >
                <span className="text-gray-950">Cancelar</span>
              </button>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
