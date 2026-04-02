export const likeTypeDefs = `#graphql
  type Like {
    id: String
    authorId: String
    postId: String
    createdAt: String
  }

  type Mutation {
    createLike(authorId: String, postId: String): Boolean
  }
`;
