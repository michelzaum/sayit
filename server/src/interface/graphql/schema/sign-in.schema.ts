export const signInTypeDefs = `#graphql
  input SignInInput {
    email: String
    password: String
  }

  type AuthResponse {
    success: Boolean
  }

  type Mutation {
    signIn(body: SignInInput!): AuthResponse
    signOut: AuthResponse
  }
`;
