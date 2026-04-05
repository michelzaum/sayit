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
}

export const useStore = create(
  devtools<IState & IActions>((set) => ({
    loggedUserId: "",
    setLoggedUserId: (loggedUserId: string) => set(() => ({ loggedUserId })),
    feedPostsList: [],
    setFeedPostsList: (feedPostsList: PostCard[]) =>
      set(() => ({ feedPostsList })),
  })),
);
