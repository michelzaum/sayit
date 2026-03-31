import { IContainer } from "@/main/model";

type CreateCommentBody = {
  content: string;
  postId: string;
};

type UpdateCommentBody = {
  commentId: string;
  newContent: string;
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
  updateComment: async (
    _,
    args: UpdateCommentBody,
    { updateCommentUseCase }: IContainer,
  ) => {
    const { commentId, newContent } = args;
    return await updateCommentUseCase.execute(commentId, newContent);
  },
};
