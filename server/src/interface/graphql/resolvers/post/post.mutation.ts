import { IContainer } from "@/main/model";

interface CreatePostBody {
  body: {
    content: string;
    authorId: string;
  };
}

export const postMutation = {
  createPost: async (_, { body }: CreatePostBody, context: IContainer) => {
    const cookie = context.http.req.headers.cookie;

    return await context.createPostUseCase.execute(body, cookie);
  },
};
