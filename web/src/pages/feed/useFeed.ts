import { useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POSTS } from "./query";
import { PostCard } from "../../entities/PostCard";

type GetPosts = {
  getPosts: PostCard[];
};

export function useFeed() {
  const { error, data } = useQuery<GetPosts>(GET_POSTS);

  if (error) {
    toast.error("Erro ao carregar posts. Tente novamente");
  }

  return {
    data,
  };
}
