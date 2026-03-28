import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useLazyQuery } from "@apollo/client/react";
import { toast } from "sonner";

import { GET_POST } from "./query";
import { PostProps } from "./types";

interface GetPostData {
  getPost: PostProps;
}

export function usePostDetails() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [getPost, { data, loading, error }] =
    useLazyQuery<GetPostData>(GET_POST);

  useEffect(() => {
    async function handleGetPosts() {
      try {
        await getPost({
          variables: {
            postId,
          },
        });
      } catch {
        toast.error("Erro ao carregar post. Tente novamente");
      }
    }

    handleGetPosts();
  }, [getPost, postId]);

  return {
    data,
    loading,
    error,
  };
}
