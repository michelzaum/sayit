import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLazyQuery } from "@apollo/client/react";

import { months } from "@/shared/constants/months";
import { GetAllPostsByAuthorId, GetUserProfileInfo, UserProfileInfo } from "./types";
import { GET_ALL_POSTS_BY_AUTHOR_ID } from "./queries/getAllPostsByAuthorId";
import { GET_USER_PROFILE_INFO } from "./queries/getUserProfileInfo";

export function useProfile() {
  const { id } = useParams<{ id: string }>();
  const [getUserProfileInfo] = useLazyQuery<GetUserProfileInfo>(GET_USER_PROFILE_INFO, { fetchPolicy: 'no-cache' });
  const [getAllPostsByAuthorId] = useLazyQuery<GetAllPostsByAuthorId>(GET_ALL_POSTS_BY_AUTHOR_ID, { fetchPolicy: 'no-cache' });
  const [userInfo, setUserInfo] = useState<UserProfileInfo>({} as UserProfileInfo);
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>({} as GetAllPostsByAuthorId);

  useEffect(() => {
    async function handleGetUserInfoAndPosts() {
      const [
        { data: userProfileInfo },
        { data: allPostsByAuthorId },
      ] = await Promise.all([
        getUserProfileInfo({ variables: { userId: id } }),
        getAllPostsByAuthorId({ variables: { authorId: id } }),
      ]);

      if (userProfileInfo.getUserProfileInfo) {
        const userCreatedAtMonth = new Date(Number(userProfileInfo.getUserProfileInfo.userInfo.createdAt)).getMonth();
        const userCreatedAtYear = new Date(Number(userProfileInfo.getUserProfileInfo.userInfo.createdAt)).getFullYear();

        setUserInfo(() => ({
          userInfo: {
            bio: userProfileInfo.getUserProfileInfo.userInfo.bio,
            name: userProfileInfo.getUserProfileInfo.userInfo.name,
            createdAt: `${months[userCreatedAtMonth]} ${userCreatedAtYear}`,
          },
          canEdit: userProfileInfo.getUserProfileInfo.canEdit,
        }));
      }

      if (allPostsByAuthorId.getAllPostsByAuthorId) {
        setUserPostsInfo(allPostsByAuthorId);
      }
    }

    handleGetUserInfoAndPosts();
  }, [id]);

  function handleFollowUser() {
    console.log('followed!');
  }

  return {
    id,
    userInfo,
    userPostsInfo,
    handleFollowUser,
  }
}
