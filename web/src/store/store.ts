import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IState {
  loggedUserId: string;
}

interface IActions {
  setLoggedUserId: (loggedUserId: string) => void;
}

export const useStore = create(
  devtools<IState & IActions>((set) => ({
    loggedUserId: "",
    setLoggedUserId: (loggedUserId: string) => set(() => ({ loggedUserId })),
  })),
);
