export const userTypeDefs = `#graphql
  type User {
    id: String
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

  type UserProfileInfoResponse {
    userInfo: User
    canEdit: Boolean
  }

  extend type Query {
    getLoggedUser: User
    getUserProfileInfo(id: String): UserProfileInfoResponse
  }

  extend type Mutation {
    createUser(body: UserInput!): MutationResponse
    updateUser(id: String, body: UserInput): MutationResponse
  }
`;
