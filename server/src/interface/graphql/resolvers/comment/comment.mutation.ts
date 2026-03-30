import { IContainer } from "@/main/model";

type CreateCommentBody = {
  content: string;
  postId: string;
};

export const commentMutation = {
  createComment: async (
    _,
    args: CreateCommentBody,
    { createCommentUseCase, http }: IContainer,
  ) => {
    const { postId, content } = args;
    const { req } = http;

    return await createCommentUseCase.execute(postId, content, req);
  },
};
