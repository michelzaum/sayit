import { IContainer } from "@/main/model";
import { pubsub } from "./post.subscription";

interface CreatePostBody {
  body: {
    content: string;
  };
}

export const postMutation = {
  createPost: async (_, { body }: CreatePostBody, context: IContainer) => {
    const request = context.http.req;

    pubsub.publish("POST_CREATED", { postCreated: body });
    return await context.createPostUseCase.execute(body, request);
  },
};
