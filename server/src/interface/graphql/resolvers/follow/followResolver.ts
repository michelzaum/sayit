import { followMutation } from "./follow.mutation";
import { followQuery } from "./follow.query";

export const followResolver = {
  Mutation: followMutation,
  Query: followQuery,
};
