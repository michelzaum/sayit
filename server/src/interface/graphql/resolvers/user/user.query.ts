import { IContainer } from "@/main/model";

type GetUserProfileInfoArgs = {
  id: string;
}

export const userQuery = {
  getLoggedUser: async (_, __, { authenticatedUser, getUserUseCase }: IContainer) => {
    return await getUserUseCase.execute(authenticatedUser.id);
  },
  getUserProfileInfo: async (_, args: GetUserProfileInfoArgs, { authenticatedUser, getUserProfileInfoUseCase }: IContainer) => {
    const { id } = args;

    return getUserProfileInfoUseCase.execute(authenticatedUser.id, id);
  },
};
