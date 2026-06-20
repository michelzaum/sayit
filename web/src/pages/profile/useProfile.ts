import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useLazyQuery, useMutation } from "@apollo/client/react";

import { months } from "@/shared/constants/months";
import {
  GetAllPostsByAuthorId,
  GetUserProfileInfo,
  UserProfileInfo,
} from "./types";
import { GET_ALL_POSTS_BY_AUTHOR_ID } from "./queries/getAllPostsByAuthorId";
import { GET_USER_PROFILE_INFO } from "./queries/getUserProfileInfo";
import { START_FOLLOWING } from "./mutations/startFollowing";

export function useProfile() {
  const { id } = useParams<{ id: string }>();
  const [getUserProfileInfo] = useLazyQuery<GetUserProfileInfo>(
    GET_USER_PROFILE_INFO,
    { fetchPolicy: "no-cache" },
  );
  const [getAllPostsByAuthorId] = useLazyQuery<GetAllPostsByAuthorId>(
    GET_ALL_POSTS_BY_AUTHOR_ID,
    { fetchPolicy: "no-cache" },
  );
  const [startFollowing] = useMutation(START_FOLLOWING);
  const [userInfo, setUserInfo] = useState<UserProfileInfo>(
    {} as UserProfileInfo,
  );
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>(
    {} as GetAllPostsByAuthorId,
  );
  const [isLoggedUserFollowing, setIsLoggedUserFollowing] = useState(false);
  const [isUnFollowUserModalOpen, setIsUnFollowUserModalOpen] = useState(false);

  useEffect(() => {
    async function handleGetUserInfoAndPosts() {
      const [{ data: userProfileInfo }, { data: allPostsByAuthorId }] =
        await Promise.all([
          getUserProfileInfo({ variables: { userId: id } }),
          getAllPostsByAuthorId({ variables: { authorId: id } }),
        ]);

      if (userProfileInfo.getUserProfileInfo) {
        const userCreatedAtMonth = new Date(
          Number(userProfileInfo.getUserProfileInfo.userInfo.createdAt),
        ).getMonth();
        const userCreatedAtYear = new Date(
          Number(userProfileInfo.getUserProfileInfo.userInfo.createdAt),
        ).getFullYear();

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
  }, [getAllPostsByAuthorId, getUserProfileInfo, id]);

  async function handleFollowUser() {
    try {
      await startFollowing({
        variables: {
          userFollowedId: id,
        },
      });

      setIsLoggedUserFollowing(true);
    } catch {
      toast.error("Ocorreu um erro ao seguir usuario. Tente novamente");
    }
  }

  function handleUnFollowUser() {
    console.log("not following anymore...");
    setIsLoggedUserFollowing(false);
    closeUnFollowUserModal();
  }

  function openUnFollowUserModal() {
    setIsUnFollowUserModalOpen(true);
  }

  function closeUnFollowUserModal() {
    setIsUnFollowUserModalOpen(false);
  }

  return {
    id,
    isLoggedUserFollowing,
    isUnFollowUserModalOpen,
    userInfo,
    userPostsInfo,
    closeUnFollowUserModal,
    handleUnFollowUser,
    handleFollowUser,
    openUnFollowUserModal,
  };
}
