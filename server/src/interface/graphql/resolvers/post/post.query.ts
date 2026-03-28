import { IContainer } from "@/main/model";

interface GetPostArgs {
  postId: string;
}

export const postQuery = {
  getPosts: async (_, args, { listPostsUseCase }: IContainer) => {
    return await listPostsUseCase.execute();
  },
  getPost: async (
    _,
    { postId }: GetPostArgs,
    { getPostUseCase }: IContainer,
  ) => {
    return await getPostUseCase.execute(postId);
  },
};
