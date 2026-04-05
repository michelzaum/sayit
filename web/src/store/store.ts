import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IStore {
  loggedUserId: string;
  setLoggedUserId: (loggedUserId: string) => void;
}

export const useStore = create(
  devtools<IStore>((set) => ({
    loggedUserId: "",
    setLoggedUserId: (loggedUserId: string) => set(() => ({ loggedUserId })),
  })),
);
