import { gql } from "@apollo/client";

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: String, $newContent: String) {
    updateComment(commentId: $commentId, newContent: $newContent) {
      content
    }
  }
`;
