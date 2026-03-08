export const signInTypeDefs = `#graphql
  input SignInInput {
    email: String
    password: String
  }

  type SignInResponse {
    success: Boolean
  }

  type Mutation {
    signIn(body: SignInInput!): SignInResponse
  }
`;
