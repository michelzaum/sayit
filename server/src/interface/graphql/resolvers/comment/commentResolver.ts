import { commentMutation } from "./comment.mutation";
import { commentQuery } from "./commet.query";

export const commentResolver = {
  Mutation: commentMutation,
  Query: commentQuery,
};
