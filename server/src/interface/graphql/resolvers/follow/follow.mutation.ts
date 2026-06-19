import { IContainer } from "@/main/model";

type StartFollowingArgs = {
  userFollowedId: string;
};

export const followMutation = {
  startFollowing: async (
    _,
    args: StartFollowingArgs,
    { startFollowingUseCase, authenticatedUser }: IContainer,
  ) => {
    const { id } = authenticatedUser;
    const { userFollowedId } = args;

    return startFollowingUseCase.execute(userFollowedId, id);
  },
};
