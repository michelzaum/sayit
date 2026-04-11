import { IContainer } from "@/main/model";

interface GetAllCommentsArgs {
  postId: string;
}

export const commentQuery = {
  getAllCommentsByPostId: async (
    _,
    args: GetAllCommentsArgs,
    { getAllCommentsByPostIdUseCase }: IContainer,
  ) => {
    const { postId } = args;
    return getAllCommentsByPostIdUseCase.execute(postId);
  },
};
