import { PostCard } from "@/entities/PostCard";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IState {
  loggedUserId: string;
  feedPostsList: PostCard[];
}

interface IActions {
  setLoggedUserId: (loggedUserId: string) => void;
  setFeedPostsList: (feedPostsList: PostCard[]) => void;
  addPostLike: (postId: string) => void;
  getPostById: (postId: string) => PostCard;
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
    getPostById: (postId: string) =>
      get().feedPostsList.find((post) => post.id === postId),
  })),
);
