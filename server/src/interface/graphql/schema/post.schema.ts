export const postTypeDefs = `#graphql
  type Post {
    id: String
    content: String
    author: User
    likes: [Like!]
    comments: [Comment!]
    createdAt: String
  }

  input PostInput {
    content: String
  }

  type Query {
    getPosts: [Post!]
    getPost(postId: String): Post
  }

  type Mutation {
    createPost(body: PostInput!): Post
    updatePost(id: String, newContent: String): Post
    deletePost(id: String): Boolean
  }

  type Subscription {
    postCreated: Post
  }
`;
