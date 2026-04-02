import { IContainer } from "@/main/model";

type CreateLikeArgs = {
  authorId: string;
  postId: string;
};

export const likeMutation = {
  createLike: async (
    _,
    args: CreateLikeArgs,
    { createLikeUseCase }: IContainer,
  ) => {
    const { authorId, postId } = args;
    return createLikeUseCase.execute(authorId, postId);
  },
};
