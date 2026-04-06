import { PostCard } from "../../entities/PostCard";

export type GetPosts = {
  getPosts: {
    posts: PostCard[];
    loggedUser: {
      id: string;
    };
  };
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  likes: { authorId: string }[];
  comments: { author: { name: string } }[];
  author: {
    name: string;
    email: string;
  };
};

export type PostCreatedSubscription = {
  postCreated: Post;
};
