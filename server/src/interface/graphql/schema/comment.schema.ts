export const commentTypeDefs = `#graphql
  type Comment {
    id: String
    content: String
    author: User
    postId: String
    createdAt: String
  }

  type CreateCommentResponse {
    id: String
    content: String
    createdAt: String
    authorName: String
  }

  type Mutation {
    createComment(authorId: String, postId: String, content: String): CreateCommentResponse
  }
`;
