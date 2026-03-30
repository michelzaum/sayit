import { gql } from "@apollo/client";

export const GET_POST = gql`
  query GetPost($postId: String) {
    getPost(postId: $postId) {
      id
      content
      createdAt
      comments {
        id
        author {
          name
        }
        content
        createdAt
      }
      likes {
        authorId
      }
      author {
        id
        name
      }
    }
  }
`;
