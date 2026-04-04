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

  type Query {
    getPostLikesByAuthorId(authorId: String): Boolean
  }

  type Mutation {
    createLike(authorId: String, postId: String): CreateLikeResponse
    deleteLike(authorId: String, postId: String): Boolean
  }
`;
