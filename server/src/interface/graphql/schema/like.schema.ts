export const likeTypeDefs = `#graphql
  type Like {
    id: String
    authorId: String
    postId: String
    createdAt: String
  }

  type CreateLikeResponse {
    authorId: String
    postId: String
  }

  type Mutation {
    createLike(authorId: String, postId: String): CreateLikeResponse
    deleteLike(authorId: String, postId: String): Boolean
  }
`;
