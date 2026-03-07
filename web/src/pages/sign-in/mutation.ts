import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($body: SignInInput!) {
    signIn(body: $body) {
      accessToken
    }
  }
`;
