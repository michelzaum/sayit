import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($body: PostInput!) {
    createPost(body: $body) {
      content
    }
  }
`;
