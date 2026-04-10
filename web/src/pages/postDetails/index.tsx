import { Link } from "react-router";
import { ArrowLeftIcon, Loader, MoreHorizontal, User2 } from "lucide-react";

import { PostItem } from "../../components/postItem";
import { usePostDetails } from "./usePostDetails";
import { formatRelativeDate } from "@/shared/formatRelativeDate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PostDetails() {
  const {
    postDetails,
    loading,
    newCommentRef,
    updatedCommentRef,
    updatedCommentContent,
    createCommentLoading,
    isUpdateCommentModalOpen,
    isDeleteCommentModalOpen,
    updateCommentLoading,
    deleteCommentLoading,
    openUpdateCommentModal,
    closeUpdateCommentModal,
    closeDeleteCommentModal,
    openDeleteCommentModal,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  } = usePostDetails();

  const isCommentOwner = true; // temporary

  if (!postDetails) {
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
            Postagem de {postDetails.author.name}
          </span>
          <PostItem
            id={postDetails.id}
            authorImage={""}
            authorName={postDetails.author.name}
            createdAt={postDetails.createdAt}
            postContent={postDetails.content}
            likesCount={postDetails.likes.length}
            commentsCount={0}
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
              className="text-xs font-medium bg-blue-950 text-white p-3 rounded-lg disabled:bg-gray-400 hover:bg-blue-900 transition-colors cursor-pointer"
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
          {true ? (
            <div className="flex justify-center p-3">
              <span>Esse post ainda não tem comentários.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {postDetails.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-300 p-4 rounded-lg"
                >
                  <div className="flex flex-col gap-2 justify-between items-start">
                    <div className="w-full flex gap-3 justify-between">
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
                      {isCommentOwner && (
                        <div className="self-end items-start">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="hover:cursor-pointer border-gray-400"
                              >
                                <MoreHorizontal />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="max-w-32 p-0"
                              align="start"
                            >
                              <button
                                className="flex flex-col items-start p-3 hover:bg-red-100 hover:cursor-pointer"
                                onClick={() =>
                                  openDeleteCommentModal(comment.id)
                                }
                              >
                                <span className="text-red-600">Excluir</span>
                              </button>
                              <button
                                className="flex flex-col items-start p-3 hover:bg-gray-100 hover:cursor-pointer"
                                onClick={() =>
                                  openUpdateCommentModal(
                                    comment.id,
                                    comment.content,
                                  )
                                }
                              >
                                <span>Editar</span>
                              </button>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {formatRelativeDate(comment.createdAt.toString())}
                      </span>
                    </div>
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
      <Dialog open={isUpdateCommentModalOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Editar comentário</DialogTitle>
            <DialogDescription asChild>
              <form
                onSubmit={handleUpdateComment}
                className="flex flex-col gap-6"
              >
                <textarea
                  defaultValue={updatedCommentContent}
                  ref={updatedCommentRef}
                  name="newPostContent"
                  id="newPostContent"
                  rows={4}
                  className="border border-gray-300 rounded-lg resize-none p-3 text-gray-950"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-950 disabled:bg-gray-400 text-gray-50 flex items-center justify-center font-medium py-4 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer disabled:"
                  disabled={updateCommentLoading}
                >
                  {!updateCommentLoading ? (
                    <span>Salvar alterações</span>
                  ) : (
                    <Loader size={24} className="animate-spin" />
                  )}
                </button>
                <button
                  type="button"
                  className="hover:cursor-pointer"
                  onClick={closeUpdateCommentModal}
                >
                  <span className="text-gray-950">Cancelar</span>
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteCommentModalOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Excluir comentário?</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este comentário?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="hover:cursor-pointer"
              variant="outline"
              onClick={closeDeleteCommentModal}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              className="hover:cursor-pointer"
              variant="destructive"
              type="button"
              onClick={handleDeleteComment}
              disabled={deleteCommentLoading}
            >
              {deleteCommentLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Excluir</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
