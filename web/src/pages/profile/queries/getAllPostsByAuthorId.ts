import { gql } from "@apollo/client";

export const GET_ALL_POSTS_BY_AUTHOR_ID = gql`
  query GetAllPostsByAuthorId($authorId: String) {
    getAllPostsByAuthorId(authorId: $authorId) {
      id
      content
      createdAt
      comments {
        id
        author {
          id
          name
        }
        content
      }
      likes {
        postId
        authorId
      }
    }
  }
`;
