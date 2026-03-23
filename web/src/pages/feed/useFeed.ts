import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POSTS } from "./query";
import { POST_CREATED_SUBSCRIPTION } from "./subscription";
import { GetPosts, PostCreatedSubscription } from "./types";

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

          const newPost = subscriptionData.data.postCreated;

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
