import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($authorId: String, $postId: String, $content: String) {
    createComment(authorId: $authorId, postId: $postId, content: $content) {
      id
      content
      authorName
    }
  }
`;
