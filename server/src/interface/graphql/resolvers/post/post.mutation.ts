import { IContainer } from "@/main/model";

interface CreatePostBody {
  body: {
    content: string;
    authorId: string;
  };
}

export const postMutation = {
  createPost: async (_, { body }: CreatePostBody, context: IContainer) => {
    const request = context.http.req;

    return await context.createPostUseCase.execute(body, request);
  },
};
