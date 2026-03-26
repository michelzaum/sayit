import { gql } from "@apollo/client";

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostId: String, $newContent: String) {
    updatePost(id: $updatePostId, newContent: $newContent) {
      content
    }
  }
`;
