import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($body: UserInput!) {
    createUser(body: $body) {
      user {
        email
      }
    }
  }
`;
