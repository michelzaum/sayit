import { IContainer } from "@/main/model";

interface GetPostArgs {
  postId: string;
}

interface GetAllPostByAuthorIdArgs {
  authorId: string;
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
  getAllPostsByAuthorId: async (_, args: GetAllPostByAuthorIdArgs, { getAllPostsByAuthorIdUseCase }: IContainer) => {
    const { authorId } = args;
    return getAllPostsByAuthorIdUseCase.execute(authorId);
  }
};
