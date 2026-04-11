export const postTypeDefs = `#graphql
  type Post {
    id: String
    content: String
    author: User
    likes: [Like!]
    comments: [Comment!]
    commentsCount: Int
    createdAt: String
  }

  input PostInput {
    content: String
  }

  type GetPostsResponse {
    posts: [Post!]
    loggedUser: User
  }

  type Query {
    getPosts: GetPostsResponse
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
