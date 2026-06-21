import { IContainer } from "@/main/model";

type IsLoggedUserFollowingUserProfileIdArgs = {
  userProfileId: string;
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
};
