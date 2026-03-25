import { gql } from "@apollo/client";

export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: String) {
    deletePost(id: $deletePostId)
  }
`;
