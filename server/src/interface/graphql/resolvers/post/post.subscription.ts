import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const postSubscription = {
  postCreated: {
    subscribe: () => pubsub.asyncIterableIterator(["POST_CREATED"]),
  },
};
