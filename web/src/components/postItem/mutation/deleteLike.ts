import { gql } from "@apollo/client";

export const DELETE_LIKE = gql`
  mutation Mutation($postId: String) {
    deleteLike(postId: $postId)
  }
`;
