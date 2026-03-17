import { PubSub } from "graphql-subscriptions";

import { IContainer } from "@/main/model";

interface CreatePostBody {
  body: {
    content: string;
  };
}

const pubsub = new PubSub();

export const postMutation = {
  createPost: async (_, { body }: CreatePostBody, context: IContainer) => {
    const request = context.http.req;

    pubsub.publish("POST_CREATED", { postCreated: body });
    return await context.createPostUseCase.execute(body, request);
  },
};
