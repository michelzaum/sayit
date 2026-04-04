import { IContainer } from "@/main/model";

type LikeArgs = {
  authorId: string;
  postId: string;
};

export const likeMutation = {
  createLike: async (_, args: LikeArgs, { createLikeUseCase }: IContainer) => {
    const { authorId, postId } = args;
    return createLikeUseCase.execute(authorId, postId);
  },
  deleteLike: async (_, args: LikeArgs, { deleteLikeUseCase }: IContainer) => {
    const { authorId, postId } = args;
    return deleteLikeUseCase.execute(authorId, postId);
  },
  getPostLikesByAuthorId: async (
    _,
    args: Pick<LikeArgs, "authorId">,
    { getPostLikesByAuthorIdUseCase }: IContainer,
  ) => {
    const { authorId } = args;
    return getPostLikesByAuthorIdUseCase.execute(authorId);
  },
};
