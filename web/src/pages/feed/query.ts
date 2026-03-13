import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      content
      createdAt
      likes {
        authorId
      }
      comments {
        postId
      }
      author {
        email
        name
      }
    }
  }
`;
