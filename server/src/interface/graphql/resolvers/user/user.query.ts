import { IContainer } from "@/main/model";

export const userQuery = {
  getLoggedUser: async (_, __, { http, getUserUseCase }: IContainer) => {
    const { req } = http;
    return await getUserUseCase.execute(req);
  },
};
