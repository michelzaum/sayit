import { User } from "@/entities/User";

export type PostProps = {
  id: string;
  author: Partial<User>;
  authorImage?: string;
  createdAt: Date;
  postContent: string;
  likesCount: number;
  commentsCount: number;
};
