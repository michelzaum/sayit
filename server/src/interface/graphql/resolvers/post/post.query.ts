import { IContainer } from "@/main/model";

export const postQuery = {
  getPosts: async (_, args, { listPostsUseCase }: IContainer) => {
    return await listPostsUseCase.execute();
  },
};
