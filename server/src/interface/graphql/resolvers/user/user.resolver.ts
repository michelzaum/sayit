import { userQuery } from "./user.query";
import { userMutation } from "./user.mutation";

export const userResolver = {
  Query: userQuery,
  Mutation: userMutation,
};
