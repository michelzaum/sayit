import { likeMutation } from "./like.mutation";
import { likeQuery } from "./like.query";

export const likeResolver = {
  Mutation: likeMutation,
  Query: likeQuery,
};
