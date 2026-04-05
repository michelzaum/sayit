export const likeTypeDefs = `#graphql
  type Like {
    id: String
    authorId: String
    postId: String
    createdAt: String
  }

  type LikeResponse {
    authorId: String
    postId: String
  }

  type Query {
    getPostLikesByAuthorId(authorId: String): [LikeResponse]
  }

  type Mutation {
    createLike(postId: String): LikeResponse
    deleteLike(postId: String): Boolean
  }
`;
