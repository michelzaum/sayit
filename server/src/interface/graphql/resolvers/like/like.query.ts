import { IContainer } from "@/main/model";

type LikeArgs = {
  authorId: string;
  postId: string;
};

export const likeQuery = {
  getPostLikesByAuthorId: async (
    _,
    args: Pick<LikeArgs, "authorId">,
    { getPostLikesByAuthorIdUseCase }: IContainer,
  ) => {
    const { authorId } = args;
    return await getPostLikesByAuthorIdUseCase.execute(authorId);
  },
};
