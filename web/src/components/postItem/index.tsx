import { Link } from "react-router";
import { Heart, MessageSquare, User2, MoreHorizontal } from "lucide-react";

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
    isPostLiked,
    isDeletePostModalOpen,
    formatPostDate,
    toggleLike,
    openDeletePostModal,
    closeDeletePostModal,
    handleDeletePost,
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
          <button className="hover:cursor-pointer" onClick={toggleLike}>
            <Heart
              height={32}
              width={32}
              className={`${isPostLiked ? "fill-red-500 stroke-red-500" : "bg-transparent stroke-1 stroke-gray-400"}`}
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
                  className="flex flex-col items-start p-3 hover:bg-gray-100 hover:cursor-pointer"
                  onClick={openDeletePostModal}
                >
                  <span>Excluir</span>
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <span className="text-[10px] text-gray-500">
        {formatPostDate(createdAt.toString())}
      </span>
      <Link to="/postDetails" className="py-4 block">
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
            >
              Cancelar
            </Button>
            <Button
              className="hover:cursor-pointer"
              variant="destructive"
              type="button"
              onClick={() => handleDeletePost(id)}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
