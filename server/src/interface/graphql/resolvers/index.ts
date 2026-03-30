import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/user.resolver";
import { postResolver } from "./post/post.resolver";
import { signInResolver } from "./signIn/sign-in.resolver";
import { commentResolver } from "./comment/commentResolver";

export const resolvers = mergeResolvers([
  userResolver,
  postResolver,
  signInResolver,
  commentResolver,
]);
