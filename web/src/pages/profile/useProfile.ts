import { useQuery } from "@apollo/client/react";
import { GET_LOGGED_USER } from "./query";

type LoggedUser = {
  getLoggedUser: {
    name: string;
    createdAt: string;
  }
}

export function useProfile() {
  const { data } = useQuery<LoggedUser>(GET_LOGGED_USER);

  return {
    data,
  }
}
