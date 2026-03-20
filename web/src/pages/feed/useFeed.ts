import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POSTS } from "./query";
import { PostCard } from "../../entities/PostCard";
import { POST_CREATED_SUBSCRIPTION } from "./subscription";

type GetPosts = {
  getPosts: PostCard[];
};

type Post = {
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

type PostCreatedSubscription = {
  postCreated: Post;
};

export function useFeed() {
  const { error, loading, data, subscribeToMore } =
    useQuery<GetPosts>(GET_POSTS);

  if (error) {
    toast.error("Erro ao carregar posts. Tente novamente");
  }

  useEffect(() => {
    if (data) {
      const unsubscribe = subscribeToMore<PostCreatedSubscription>({
        document: POST_CREATED_SUBSCRIPTION,
        updateQuery: (prev: any, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newPost = subscriptionData.data.postCreated as any;

          const exists = prev.getPosts.some(
            (post: any) => post.id === newPost.id,
          );

          if (exists) return prev;

          return {
            ...prev,
            getPosts: [...prev.getPosts, newPost],
          };
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [data, subscribeToMore]);

  return {
    loading,
    data,
  };
}
