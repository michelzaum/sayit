import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useLazyQuery, useMutation } from "@apollo/client/react";

import { useStore } from "@/store/store";
import { months } from "@/shared/constants/months";
import {
  GetAllPostsByAuthorId,
  GetUserProfileInfo,
  UserProfileInfo,
} from "./types";
import { GET_ALL_POSTS_BY_AUTHOR_ID } from "./queries/getAllPostsByAuthorId";
import { GET_USER_PROFILE_INFO } from "./queries/getUserProfileInfo";
import { START_FOLLOWING } from "./mutations/startFollowing";
import { STOP_FOLLOWING } from "./mutations/stopFollowing";
import { IS_LOGGED_USER_FOLLOWING_USER_PROFILE_ID } from "./queries/isLoggedUserFollowingUserProfileId";
import { GET_USER_RELATIONS } from "./queries/getUserRelations";

type UserRelationInfo = {
  following: {
    userFollowedId: string;
  }[];
  followers: {
    followedByUserId: string;
  }[];
};

type GetUserRelations = {
  getUserRelations: UserRelationInfo;
};

export function useProfile() {
  const { id } = useParams<{ id: string }>();
  const [getUserProfileInfo, { loading: getUserProfileInfoLoading }] =
    useLazyQuery<GetUserProfileInfo>(GET_USER_PROFILE_INFO, {
      fetchPolicy: "no-cache",
    });
  const [getAllPostsByAuthorId, { loading: getAllPostsByAuthorIdLoading }] =
    useLazyQuery<GetAllPostsByAuthorId>(GET_ALL_POSTS_BY_AUTHOR_ID, {
      fetchPolicy: "no-cache",
    });
  const [
    handleIsLoggedUserFollowing,
    { loading: handleIsLoggedUserFollowingLoading },
  ] = useLazyQuery<{
    isLoggedUserFollowingUserProfileId: boolean;
  }>(IS_LOGGED_USER_FOLLOWING_USER_PROFILE_ID, {
    fetchPolicy: "no-cache",
  });
  const [getUserRelations, { loading: getUserRelationsLoading }] =
    useLazyQuery<GetUserRelations>(GET_USER_RELATIONS, {
      fetchPolicy: "no-cache",
    });
  const [startFollowing] = useMutation(START_FOLLOWING);
  const [stopFollowing] = useMutation(STOP_FOLLOWING);
  const [userInfo, setUserInfo] = useState<UserProfileInfo>(
    {} as UserProfileInfo,
  );
  const [userPostsInfo, setUserPostsInfo] = useState<GetAllPostsByAuthorId>(
    {} as GetAllPostsByAuthorId,
  );
  const [isLoggedUserFollowing, setIsLoggedUserFollowing] = useState(false);
  const [isUnFollowUserModalOpen, setIsUnFollowUserModalOpen] = useState(false);
  const [userRelationInfo, setUserRelationInfo] = useState<UserRelationInfo>();
  const [followersCount, setFollowersCount] = useState(0);
  const loggedUserId = useStore((state) => state.loggedUserId);

  useEffect(() => {
    async function handleGetUserInfoAndPosts() {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }

    handleGetUserInfoAndPosts();
  }, [getAllPostsByAuthorId, getUserProfileInfo, id]);

  useEffect(() => {
    async function checkisLoggedUserFollowing() {
      try {
        if (id === loggedUserId) {
          return;
        }

        const { data: isLoggedUserFollowing } =
          await handleIsLoggedUserFollowing({
            variables: {
              userProfileId: id,
            },
          });

        if (isLoggedUserFollowing.isLoggedUserFollowingUserProfileId) {
          setIsLoggedUserFollowing(
            isLoggedUserFollowing.isLoggedUserFollowingUserProfileId,
          );
        }
      } catch {
        toast.error("Erro ao carregar dados do perfil. Tente novamente");
      }
    }

    checkisLoggedUserFollowing();
  }, [handleIsLoggedUserFollowing, id, loggedUserId]);

  useEffect(() => {
    async function handleGetUserRelations() {
      try {
        const { data } = await getUserRelations({
          variables: {
            userId: id,
          },
        });

        setUserRelationInfo(data.getUserRelations);
        setFollowersCount(data.getUserRelations.followers.length);
      } catch {
        toast.error(
          "Ocorreu um erro ao carregar dados de seguidores. Tente novamente",
        );
      }
    }

    handleGetUserRelations();
  }, [getUserRelations, id]);

  async function handleFollowUser() {
    try {
      await startFollowing({
        variables: {
          userFollowedId: id,
        },
      });

      setIsLoggedUserFollowing(true);
      setFollowersCount((prevState) => prevState + 1);
    } catch {
      toast.error("Ocorreu um erro ao seguir usuario. Tente novamente");
    }
  }

  async function handleUnFollowUser() {
    try {
      await stopFollowing({
        variables: {
          userFollowedId: id,
        },
      });

      setIsLoggedUserFollowing(false);
      setFollowersCount((prevState) => prevState - 1);
    } catch {
      toast.error(
        "Ocorreu um erro ao deixar de seguir usuario. Tente novamente",
      );
    }

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
    userRelationInfo,
    followersCount,
    getUserProfileInfoLoading,
    getAllPostsByAuthorIdLoading,
    getUserRelationsLoading,
    handleIsLoggedUserFollowingLoading,
    closeUnFollowUserModal,
    handleUnFollowUser,
    handleFollowUser,
    openUnFollowUserModal,
  };
}
