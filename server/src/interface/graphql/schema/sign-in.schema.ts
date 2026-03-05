export const signInTypeDefs = `#graphql
  input SignInInput {
    email: String
    password: String
  }

  type SignInResponse {
    accessToken: String
  }

  type Mutation {
    signIn(body: SignInInput!): SignInResponse
  }
`;
