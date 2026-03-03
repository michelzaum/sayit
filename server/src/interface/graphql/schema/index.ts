import { userTypeDefs } from "./user.schema";
import { postTypeDefs } from "./post.schema";
import { likeTypeDefs } from "./like.schema";
import { commentTypeDefs } from "./comment.schema";

export const typeDefs = [
  userTypeDefs,
  postTypeDefs,
  likeTypeDefs,
  commentTypeDefs,
];
