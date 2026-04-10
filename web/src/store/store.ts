import { PostCard } from "@/entities/PostCard";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IState {
  loggedUserId: string;
  feedPostsList: PostCard[];
  postDetailsComments: AllCommentsResponse;
}

type CommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
};

type AllCommentsResponse = {
  getAllCommentsByPostId: CommentResponse[];
};

type PostComment = {
  id: string;
  content: string;
  postId: string;
};

interface IActions {
  setLoggedUserId: (loggedUserId: string) => void;
  setFeedPostsList: (feedPostsList: PostCard[]) => void;
  addPostLike: (postId: string) => void;
  removePostLike: (postId: string) => void;
  getPostById: (postId: string) => PostCard;
  addPostComment: (comment: PostComment) => void;
  setPostDetailsComments: (postDetailsComments: AllCommentsResponse) => void;
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
    addPostComment: (postComment: PostComment) =>
      set(({ feedPostsList }) => ({
        feedPostsList: feedPostsList.map((post) =>
          post.id === postComment.id
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: postComment.id,
                    authorId: get().loggedUserId,
                    content: postComment.content,
                    postId: postComment.postId,
                  },
                ],
              }
            : post,
        ),
      })),
    postDetailsComments: {},
    setPostDetailsComments: (postDetailsComments: AllCommentsResponse) =>
      set(() => ({ postDetailsComments })),
  })),
);
