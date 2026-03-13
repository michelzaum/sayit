import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

export type PostCard = {
  id: string;
  content: string;
  createdAt: Date;
  author: User;
  comments: Comment[];
  likes: Like[];
};
