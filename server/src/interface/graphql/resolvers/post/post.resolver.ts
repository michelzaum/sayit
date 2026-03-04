import { postQuery } from "./post.query";
import { postMutation } from "./post.mutation";

export const postResolver = {
  Query: postQuery,
  Mutation: postMutation,
};
