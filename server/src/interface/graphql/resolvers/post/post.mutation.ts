import { IContainer } from "@/main/model";
import { pubsub } from "./post.subscription";

interface CreatePostBody {
  body: {
    content: string;
  };
}

interface DeletePostArgs {
  id: string;
}

interface UpdatePostArgs {
  id: string;
  newContent: string;
}

export const postMutation = {
  createPost: async (_, { body }: CreatePostBody, context: IContainer) => {
    const request = context.http.req;

    const result = await context.createPostUseCase.execute(body, request);

    pubsub.publish("POST_CREATED", { postCreated: result });
    return result;
  },
  deletePost: async (_, { id }: DeletePostArgs, context: IContainer) => {
    return await context.deletePostUseCase.execute(id);
  },
  updatePost: async (
    _,
    { id, newContent }: UpdatePostArgs,
    context: IContainer,
  ) => {
    return await context.updatePostUseCase.execute(id, newContent);
  },
};
