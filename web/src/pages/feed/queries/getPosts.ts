import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      posts {
        id
        content
        createdAt
        author {
          name
        }
        comments {
          id
          createdAt
          content
        }
        likes {
          authorId
        }
      }
    }
  }
`;
