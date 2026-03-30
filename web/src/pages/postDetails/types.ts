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
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
};

export type GetPostData = {
  getPost: PostProps;
};
