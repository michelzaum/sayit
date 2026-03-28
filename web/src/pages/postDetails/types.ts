import { User } from "@/entities/User";

export type PostProps = {
  id: string;
  author: User;
  createdAt: Date;
  content: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
};

type Comment = {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  createdAt: Date;
};
