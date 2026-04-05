import { User } from "@/entities/User";
import { create } from "zustand";

interface IStore {
  loggedUser: User;
  setLoggedUser: (loggedUser: User) => void;
}

export const useStore = create<IStore>()((set) => ({
  loggedUser: {} as User,
  setLoggedUser: (loggedUserInfo: User) =>
    set(() => ({ loggedUser: loggedUserInfo })),
}));
