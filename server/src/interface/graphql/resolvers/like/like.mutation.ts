import { IContainer } from "@/main/model";

type LikeArgs = {
  authorId: string;
  postId: string;
};

export const likeMutation = {
  createLike: async (
    _,
    args: LikeArgs,
    { createLikeUseCase, authenticatedUser }: IContainer,
  ) => {
    const { postId } = args;

    return createLikeUseCase.execute(postId, authenticatedUser.id);
  },
  deleteLike: async (
    _,
    args: LikeArgs,
    { deleteLikeUseCase, http }: IContainer,
  ) => {
    const { req } = http;
    const { postId } = args;
    return deleteLikeUseCase.execute(postId, req);
  },
};
