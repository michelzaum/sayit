import { gql } from "@apollo/client";

export const GET_POSTS_LIKES_BY_USER_ID = gql`
  query Query($authorId: String) {
    getPostLikesByAuthorId(authorId: $authorId) {
      postId
    }
  }
`;
