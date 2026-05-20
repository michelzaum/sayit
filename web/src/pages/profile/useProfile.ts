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
  }[];
  likes: {
    postId: string
    authorId: string
  }[];
}

type GetAllPostsByAuthorId = {
  getAllPostsByAuthorId: UserPostsInfo[];
}

export function useProfile() {
  const [getLoggedUser] = useLazyQuery<LoggedUser>(GET_LOGGED_USER, { fetchPolicy: 'no-cache' });
  const [getAllPostsByAuthorId] = useLazyQuery<GetAllPostsByAuthorId>(GET_ALL_POSTS_BY_AUTHOR_ID, { fetchPolicy: 'no-cache' });
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>({} as GetAllPostsByAuthorId);
  const LoggedUserId = useStore(state => state.loggedUserId);

  useEffect(() => {
    async function handleGetUserInfoAndPosts() {
      const [
        { data: loggedUser },
        { data: allPostsByAuthorId }
      ] = await Promise.all([getLoggedUser(), getAllPostsByAuthorId({
        variables: {
          authorId: LoggedUserId,
        },
      })]);

      if (loggedUser.getLoggedUser) {
        const userCreatedAtMonth = new Date(Number(loggedUser.getLoggedUser.createdAt)).getMonth();
        const userCreatedAtYear = new Date(Number(loggedUser.getLoggedUser.createdAt)).getFullYear();

        setUserInfo(() => ({
          name: loggedUser.getLoggedUser.name,
          createdAt: `${months[userCreatedAtMonth]} ${userCreatedAtYear}`,
        }));
      }

      if (allPostsByAuthorId.getAllPostsByAuthorId) {
        setUserPostsInfo(allPostsByAuthorId);
      }
    }

    handleGetUserInfoAndPosts();
  }, []);

  return {
    userInfo,
    userPostsInfo,
  }
}
