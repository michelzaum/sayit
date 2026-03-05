export const userTypeDefs = `#graphql
  type User {
    name: String
    email: String
    password: String
    createdAt: String
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  interface IResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type MutationResponse implements IResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  extend type Query {
    getUser(id: String): User
    getPosts: [Post!]
    getPost: Post
  }

  extend type Mutation {
    createUser(body: UserInput!): MutationResponse
    updateUser(id: String, body: UserInput): MutationResponse
  }
`;
