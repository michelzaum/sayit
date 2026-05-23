import { IContainer } from "@/main/model";

type GetUserProfileInfoArgs = {
  id: string;
}

export const userQuery = {
  getLoggedUser: async (_, __, { authenticatedUser, getUserUseCase }: IContainer) => {
    return await getUserUseCase.execute(authenticatedUser.id);
  },
  getUserProfileInfo: async (_, args: GetUserProfileInfoArgs, { http, getUserProfileInfoUseCase }: IContainer) => {
    const { id } = args;
    const { req } = http;

    return getUserProfileInfoUseCase.execute(req, id);
  },
};
