import { IContainer } from "@/main/model";

type FollowingArgs = {
  userFollowedId: string;
};

export const followMutation = {
  startFollowing: async (
    _,
    args: FollowingArgs,
    { startFollowingUseCase, authenticatedUser }: IContainer,
  ) => {
    const { id } = authenticatedUser;
    const { userFollowedId } = args;

    return await startFollowingUseCase.execute(userFollowedId, id);
  },
  stopFollowing: async (
    _,
    args: FollowingArgs,
    { stopFollowingUseCase, authenticatedUser }: IContainer,
  ) => {
    const { id } = authenticatedUser;
    const { userFollowedId } = args;

    return await stopFollowingUseCase.execute(userFollowedId, id);
  },
};
