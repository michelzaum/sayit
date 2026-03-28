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
        authorId
        postId
      }
      author {
        id
        email
        name
      }
    }
  }
`;
