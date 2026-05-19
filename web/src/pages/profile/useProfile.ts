import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client/react";

import { months } from "@/shared/constants/months";
import { GET_LOGGED_USER } from "./queries/getLoggedUser";
import { UserInfo, LoggedUser } from "./types";
import { GET_ALL_POSTS_BY_AUTHOR_ID } from "./queries/getAllPostsByAuthorId";
import { useStore } from "@/store/store";

type UserPostsInfo = {
  content: string;
  createdAt: string;
  comments: {
    id: string
    author: {
      id: string
      name: string;
    };
    content: string;
  };
  likes: {
    postId: string
    authorId: string
  };
}

type GetAllPostsByAuthorId = {
  getAllPostsByAuthorId: UserPostsInfo[];
}

export function useProfile() {
  const { data } = useQuery<LoggedUser>(GET_LOGGED_USER, { fetchPolicy: 'no-cache' });
  const [getAllPostsByAuthorId] = useLazyQuery<GetAllPostsByAuthorId>(GET_ALL_POSTS_BY_AUTHOR_ID, { fetchPolicy: 'no-cache' });
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>({} as GetAllPostsByAuthorId);
  const LoggedUserId = useStore(state => state.loggedUserId);

  useEffect(() => {
    async function handle() {
      if (data && data.getLoggedUser) {
        const userCreatedAtMonth = new Date(Number(data.getLoggedUser.createdAt)).getMonth();
        const userCreatedAtYear = new Date(Number(data.getLoggedUser.createdAt)).getFullYear();

        setUserInfo(() => ({
          name: data.getLoggedUser.name,
          createdAt: `${months[userCreatedAtMonth]} ${userCreatedAtYear}`,
        }));
      }

      await handleGetAllPostsByAuthorId(LoggedUserId);
    }

    handle();
  }, [data]);

  async function handleGetAllPostsByAuthorId(LoggedUserId: string): Promise<void> {
    const { data } = await getAllPostsByAuthorId({
      variables: {
        authorId: LoggedUserId,
      },
    });

    setUserPostsInfo(data);
  }

  return {
    userInfo,
    userPostsInfo,
  }
}
