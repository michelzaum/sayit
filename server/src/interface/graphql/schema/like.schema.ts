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
    createLike(authorId: String, postId: String): LikeResponse
    deleteLike(authorId: String, postId: String): Boolean
  }
`;
