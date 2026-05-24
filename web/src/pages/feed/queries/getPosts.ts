import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      posts {
        id
        content
        createdAt
        author {
          id
          name
        }
        likes {
          authorId
        }
        commentsCount
      }
      loggedUser {
        id
        name
      }
    }
  }
`;
