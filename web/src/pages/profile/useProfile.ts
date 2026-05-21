import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLazyQuery } from "@apollo/client/react";

import { months } from "@/shared/constants/months";
import { GET_LOGGED_USER } from "./queries/getLoggedUser";
import { UserInfo, LoggedUser } from "./types";
import { GET_ALL_POSTS_BY_AUTHOR_ID } from "./queries/getAllPostsByAuthorId";
import { PostCard } from "@/entities/PostCard";

type GetAllPostsByAuthorId = {
  getAllPostsByAuthorId: PostCard[];
}

export function useProfile() {
  const { id } = useParams<{ id: string }>();
  const [getLoggedUser] = useLazyQuery<LoggedUser>(GET_LOGGED_USER, { fetchPolicy: 'no-cache' });
  const [getAllPostsByAuthorId] = useLazyQuery<GetAllPostsByAuthorId>(GET_ALL_POSTS_BY_AUTHOR_ID, { fetchPolicy: 'no-cache' });
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>({} as GetAllPostsByAuthorId);

  useEffect(() => {
    async function handleGetUserInfoAndPosts() {
      const [
        { data: loggedUser },
        { data: allPostsByAuthorId }
      ] = await Promise.all([getLoggedUser(), getAllPostsByAuthorId({
        variables: {
          authorId: id,
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
