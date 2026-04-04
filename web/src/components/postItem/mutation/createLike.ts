import { gql } from "@apollo/client";

export const CREATE_LIKE = gql`
  mutation CreateLike($postId: String) {
    createLike(postId: $postId) {
      postId
      authorId
    }
  }
`;
