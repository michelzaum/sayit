export const signInTypeDefs = `#graphql
  input SignInInput {
    email: String;
    password: String;
  }

  type Mutation {
    signIn(body: SignInInput!): String;
  }
`;
