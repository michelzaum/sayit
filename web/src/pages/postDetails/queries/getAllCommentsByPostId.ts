import { gql } from "@apollo/client";

export const GET_ALL_COMMENTS_BY_POST_ID = gql`
  query Query($postId: String) {
    getAllCommentsByPostId(postId: $postId) {
      id
      content
      createdAt
      postId
      author {
        id
        name
      }
    }
  }
`;
