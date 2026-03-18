import { postQuery } from "./post.query";
import { postMutation } from "./post.mutation";
import { postSubscription } from "./post.subscription";

export const postResolver = {
  Query: postQuery,
  Mutation: postMutation,
  Subscription: postSubscription,
};
