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
    author: User
  }

  type UpdateCommentResponse {
    content: String
  }

  type Query {
    getAllCommentsByPostId(postId: String): [Comment]
  }

  type Mutation {
    createComment(postId: String, content: String): CreateCommentResponse
    updateComment(commentId: String, newContent: String): UpdateCommentResponse
    deleteComment(commentId: String): Boolean
  }
`;
