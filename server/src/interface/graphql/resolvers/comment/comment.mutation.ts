import { IContainer } from "@/main/model";

type CreateCommentBody = {
  content: string;
  authorId: string;
  postId: string;
};

export const commentMutation = {
  createComment: async (
    _,
    args: CreateCommentBody,
    { createCommentUseCase }: IContainer,
  ) => {
    const { authorId, postId, content } = args;

    return await createCommentUseCase.execute(authorId, postId, content);
  },
};
