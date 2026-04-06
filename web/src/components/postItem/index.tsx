import { Link } from "react-router";
import {
  Heart,
  MessageSquare,
  User2,
  MoreHorizontal,
  Loader,
} from "lucide-react";

import { PostProps } from "./types";
import { usePostItem } from "./usePostItem";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { formatRelativeDate } from "@/shared/formatRelativeDate";

export function PostItem({
  id,
  authorName,
  authorImage,
  createdAt,
  commentsCount,
  likesCount,
  postContent,
}: PostProps) {
  const {
    userLikedPost,
    isDeletePostModalOpen,
    isUpdatePostModalOpen,
    loading,
    updatePostLoading,
    newPostContentRef,
    isPostAlreadyLikedByUser,
    openDeletePostModal,
    closeDeletePostModal,
    openUpdatePostModal,
    closeUpdatetePostModal,
    handleCreateLike,
    handleDeletePost,
    handleUpdatePost,
  } = usePostItem();

  const isPostOwner = true; // temporary

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full p-1 border border-gray-400">
            {authorImage ? (
              <img src={authorImage} alt="User profile image" />
            ) : (
              <User2 className="text-gray-400" height={18} width={18} />
            )}
          </div>
          <span className="text-xs font-medium">{authorName}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="hover:cursor-pointer"
            onClick={() => handleCreateLike(id)}
          >
            <Heart
              height={32}
              width={32}
              className={`${userLikedPost || isPostAlreadyLikedByUser(id) ? "fill-red-500 stroke-red-500" : "bg-transparent stroke-1 stroke-gray-400"}`}
            />
          </button>
          {isPostOwner && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:cursor-pointer border-gray-400"
                >
                  <MoreHorizontal />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-32 p-0" align="start">
                <button
                  className="flex flex-col items-start p-3 hover:bg-red-100 hover:cursor-pointer"
                  onClick={openDeletePostModal}
                >
                  <span className="text-red-600">Excluir</span>
                </button>
                <button
                  className="flex flex-col items-start p-3 hover:bg-gray-100 hover:cursor-pointer"
                  onClick={openUpdatePostModal}
                >
                  <span>Editar</span>
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <span className="text-[10px] text-gray-500">
        {formatRelativeDate(createdAt.toString())}
      </span>
      <Link to={`/postDetails?postId=${id}`} className="py-4 block">
        <span className="text-xs font-medium">{postContent}</span>
      </Link>

      <div className="h-px w-full bg-gray-300"></div>

      <div className="flex items-center gap-3 py-4">
        <div className="flex items-center gap-2">
          <Heart height={18} width={18} />
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare height={18} width={18} />
          <span>{commentsCount}</span>
        </div>
      </div>

      <Dialog open={isDeletePostModalOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Excluir post?</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja exluir este post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="hover:cursor-pointer"
              variant="outline"
              onClick={closeDeletePostModal}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              className="hover:cursor-pointer"
              variant="destructive"
              type="button"
              onClick={() => handleDeletePost(id)}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Excluir</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isUpdatePostModalOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Editar post</DialogTitle>
            <DialogDescription asChild>
              <form
                onSubmit={(event) => handleUpdatePost(event, id)}
                className="flex flex-col gap-6"
              >
                <textarea
                  defaultValue={postContent}
                  ref={newPostContentRef}
                  name="newPostContent"
                  id="newPostContent"
                  rows={4}
                  className="border border-gray-300 rounded-lg resize-none p-3 text-gray-950"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-950 disabled:bg-gray-400 text-gray-50 flex items-center justify-center font-medium py-4 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer disabled:"
                  disabled={updatePostLoading}
                >
                  {!updatePostLoading ? (
                    <span>Salvar alterações</span>
                  ) : (
                    <Loader size={24} className="animate-spin" />
                  )}
                </button>
                <button
                  type="button"
                  className="hover:cursor-pointer"
                  onClick={closeUpdatetePostModal}
                >
                  <span className="text-gray-950">Cancelar</span>
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
