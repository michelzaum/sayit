import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

import { months } from "@/shared/constants/months";
import { GET_LOGGED_USER } from "./query";
import { UserInfo, LoggedUser } from "./types";

export function useProfile() {
  const { data } = useQuery<LoggedUser>(GET_LOGGED_USER, { fetchPolicy: 'cache-and-network' });
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  useEffect(() => {
    if (data) {
      const userCreatedAtMonth = new Date(Number(data.getLoggedUser.createdAt)).getMonth();
      const userCreatedAtYear = new Date(Number(data.getLoggedUser.createdAt)).getFullYear();

      setUserInfo(() => ({
        name: data.getLoggedUser.name,
        createdAt: `${months[userCreatedAtMonth]} ${userCreatedAtYear}`,
      }));
    }
  }, [data]);

  return {
    userInfo,
  }
}
