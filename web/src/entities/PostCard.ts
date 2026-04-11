import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

export type PostCard = {
  id: string;
  content: string;
  createdAt: Date;
  author: Partial<User>;
  comments: Partial<Comment>[];
  likes: Partial<Like>[];
  commentsCount: number;
  isPostLikedByUser: boolean;
};
