import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user/user.resolver";
import { postResolver } from "./post/post.resolver";

export const resolvers = mergeResolvers([userResolver, postResolver]);
