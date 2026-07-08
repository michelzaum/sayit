import { IContainer } from "@/main/model";

type IsLoggedUserFollowingUserProfileIdArgs = {
  userProfileId: string;
};

type GetUserRelationsArgs = {
  userId: string;
};

export const followQuery = {
  isLoggedUserFollowingUserProfileId: async (
    _,
    args: IsLoggedUserFollowingUserProfileIdArgs,
    {
      isLoggedUserFollowingUserProfileIdUseCase,
      authenticatedUser,
    }: IContainer,
  ) => {
    const { userProfileId } = args;
    const { id } = authenticatedUser;

    return await isLoggedUserFollowingUserProfileIdUseCase.execute(
      userProfileId,
      id,
    );
  },
  getUserRelations: async (
    _,
    args: GetUserRelationsArgs,
    { getUserRelationsUseCase }: IContainer,
  ) => {
    const { userId } = args;

    return await getUserRelationsUseCase.execute(userId);
  },
};
