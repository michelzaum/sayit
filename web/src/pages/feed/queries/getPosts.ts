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
        likes {
          authorId
        }
      }
      loggedUser {
        id
      }
    }
  }
`;
