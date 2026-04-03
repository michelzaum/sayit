import { gql } from "@apollo/client";

export const CREATE_LIKE = gql`
  mutation CreateLike($postId: String, $authorId: String) {
    createLike(postId: $postId, authorId: $authorId) {
      postId
      authorId
    }
  }
`;
