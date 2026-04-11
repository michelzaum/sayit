import { Like } from "@/modules/like/entities/Like";
import { User } from "@/modules/user/entities/User";

export type PostCard = {
  content: string;
  createdAt: Date;
  author: User;
  likes: Like[];
  commentsCount: number;
};
