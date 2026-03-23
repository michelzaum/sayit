import { PostCard } from "../../entities/PostCard";

export type GetPosts = {
  getPosts: PostCard[];
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  likes: { authorId: string }[];
  comments: { authorId: string }[];
  author: {
    name: string;
    email: string;
  };
};

export type PostCreatedSubscription = {
  postCreated: Post;
};
