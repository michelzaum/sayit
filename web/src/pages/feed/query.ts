import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      content
      createdAt
      author {
        email
        name
      }
    }
  }
`;
