import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { PostCard } from "../../entities/PostCard";

import { GET_POSTS } from "./queries/getPosts";
import { POST_CREATED_SUBSCRIPTION } from "./subscription";
import { GetPosts, PostCreatedSubscription } from "./types";
import { Like } from "@/entities/Like";

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

          const postExists = prev.getPosts.some(
            (post: PostCard) => post.id === newPost.id,
          );

          if (postExists) return prev;

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

  async function hasUserLikedPost(likes: Partial<Like>[]): Promise<boolean> {
    console.log(likes);

    return true;
  }

  return {
    loading,
    data,
    hasUserLikedPost,
  };
}
