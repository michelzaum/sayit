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
    getPost: Post
  }

  type Mutation {
    createPost(body: PostInput!): Post
    updatePost(id: String, body: PostInput): Post
  }
`;
