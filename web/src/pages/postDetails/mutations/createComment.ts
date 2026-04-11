import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String, $content: String) {
    createComment(postId: $postId, content: $content) {
      id
      content
      author {
        id
        name
      }
    }
  }
`;
