import { IContainer } from "@/main/model";

type GetUserProfileInfoArgs = {
  id: string;
}

export const userQuery = {
  getLoggedUser: async (_, __, { http, getUserUseCase }: IContainer) => {
    const { req } = http;
    return await getUserUseCase.execute(req);
  },
  getUserProfileInfo: async (_, args: GetUserProfileInfoArgs, { http, getUserProfileInfoUseCase }: IContainer) => {
    const { id } = args;
    const { req } = http;

    return getUserProfileInfoUseCase.execute(req, id);
  },
};
