import { IContainer } from "@/main/model";

interface GetPostArgs {
  postId: string;
}

export const postQuery = {
  getPosts: async (_, args, { listPostsUseCase, http }: IContainer) => {
    const { req } = http;

    return await listPostsUseCase.execute(req);
  },
  getPost: async (
    _,
    { postId }: GetPostArgs,
    { getPostUseCase }: IContainer,
  ) => {
    return await getPostUseCase.execute(postId);
  },
};
