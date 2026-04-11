import { PostCard } from "@/entities/PostCard";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  author?: {
    id: string;
    name: string;
  };
};

interface IState {
  loggedUserId: string;
  feedPostsList: PostCard[];
  commentsByPost: Record<string, CommentResponse[]>;
}

type PostComment = {
  id: string;
  content: string;
  postId: string;
  author?: {
    id: string;
    name: string;
  };
};

interface IActions {
  setLoggedUserId: (loggedUserId: string) => void;
  setFeedPostsList: (feedPostsList: PostCard[]) => void;
  addPostLike: (postId: string) => void;
  removePostLike: (postId: string) => void;
  getPostById: (postId: string) => PostCard;
  addPostComment: (comment: PostComment) => void;
  updatePostComment: (commentId: string, content: string, postId: string) => void;
  removePostComment: (commentId: string, postId: string) => void;
  setPostDetailsComments: (postId: string, comments: CommentResponse[]) => void;
}

export const useStore = create<IState & IActions>()(
  devtools((set, get) => ({
    loggedUserId: "",
    setLoggedUserId: (loggedUserId: string) => set(() => ({ loggedUserId })),
    feedPostsList: [],
    setFeedPostsList: (feedPostsList: PostCard[]) =>
      set(() => ({ feedPostsList })),
    addPostLike: (postId: string) =>
      set(({ feedPostsList }) => ({
        feedPostsList: feedPostsList.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    authorId: get().loggedUserId,
                    postId,
                  },
                ],
              }
            : post,
        ),
      })),
    removePostLike: (postId: string) =>
      set(({ feedPostsList }) => ({
        feedPostsList: feedPostsList.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes.filter(
                   (like) => like.authorId !== get().loggedUserId,
                ),
              }
            : post,
        ),
      })),
    getPostById: (postId: string) =>
      get().feedPostsList.find((post) => post.id === postId),
    commentsByPost: {},
    addPostComment: (postComment: PostComment) =>
      set((state) => {
        const currentComments = state.commentsByPost[postComment.postId] || [];
        return {
          commentsByPost: {
            ...state.commentsByPost,
            [postComment.postId]: [
              ...currentComments,
              {
                content: postComment.content,
                id: postComment.id,
                postId: postComment.postId,
                createdAt: new Date().toISOString(),
                author: postComment.author,
              },
            ],
          },
        };
      }),
    updatePostComment: (commentId: string, content: string, postId: string) =>
      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment,
          ),
        },
      })),
    removePostComment: (commentId: string, postId: string) =>
      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).filter(
            (comment) => comment.id !== commentId,
          ),
        },
      })),
    setPostDetailsComments: (postId: string, comments: CommentResponse[]) =>
      set(() => ({
        commentsByPost: {
          [postId]: comments,
        },
      })),
  })),
);
