import { IContainer } from "@/main/model";

interface GetPostArgs {
  postId: string;
}

interface GetAllPostByAuthorIdArgs {
  authorId: string;
}

export const postQuery = {
  getPosts: async (_, args, { listPostsUseCase, authenticatedUser }: IContainer) => {
    return await listPostsUseCase.execute({
      loggedUserId: authenticatedUser.id,
    });
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
