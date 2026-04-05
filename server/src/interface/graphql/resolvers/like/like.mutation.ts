import { IContainer } from "@/main/model";

type LikeArgs = {
  authorId: string;
  postId: string;
};

export const likeMutation = {
  createLike: async (
    _,
    args: LikeArgs,
    { createLikeUseCase, http }: IContainer,
  ) => {
    const { req } = http;
    const { postId } = args;

    return createLikeUseCase.execute(postId, req);
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
