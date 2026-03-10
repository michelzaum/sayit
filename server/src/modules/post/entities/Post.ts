import { Comment } from "@/modules/comments/entities/Comment";
import { Like } from "@/modules/like/entities/Like";
import { User } from "@/modules/user/entities/User";

export type Post = {
  content: string;
  authorId: string;
};
