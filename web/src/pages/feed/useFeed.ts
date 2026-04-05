import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { PostCard } from "../../entities/PostCard";

import { GET_POSTS } from "./queries/getPosts";
import { POST_CREATED_SUBSCRIPTION } from "./subscription";
import { GetPosts, PostCreatedSubscription } from "./types";
import { Like } from "@/entities/Like";
import { useStore } from "@/store/store";

export function useFeed() {
  const { error, loading, data, subscribeToMore } =
    useQuery<GetPosts>(GET_POSTS);
  const setLoggedUserId = useStore((state) => state.setLoggedUserId);
  const setFeedPostsList = useStore((state) => state.setFeedPostsList);

  if (error) {
    toast.error("Erro ao carregar posts. Tente novamente");
  }

  useEffect(() => {
    if (data && data.getPosts.posts) {
      setLoggedUserId(data.getPosts.loggedUser.id);
      setFeedPostsList(data.getPosts.posts);

      const unsubscribe = subscribeToMore<PostCreatedSubscription>({
        document: POST_CREATED_SUBSCRIPTION,
        updateQuery: (prev: any, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newPost = subscriptionData.data.postCreated;

          const postExists = prev.getPosts.posts.some(
            (post: PostCard) => post.id === newPost.id,
          );

          if (postExists) return prev;

          return {
            ...prev,
            getPosts: [...prev.getPosts.posts, newPost],
          };
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [data, subscribeToMore, setLoggedUserId]);

  // TODO: Validate if this logic is necessary.
  // We might just need the logged user ID information to check if its value is
  // in "authorId" property in "likes" array.
  function hasUserLikedPost(likes: Partial<Like>[]): boolean {
    const loggedUserId = data.getPosts.loggedUser.id;

    const item = likes.find((like) => like.authorId === loggedUserId);

    if (item?.authorId) {
      return true;
    }

    return false;
  }

  return {
    loading,
    data,
    hasUserLikedPost,
  };
}
