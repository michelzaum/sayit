import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation Mutation($updateUserId: String, $body: UpdateUserInput) {
    updateUser(id: $updateUserId, body: $body) {
      user {
        id
        name
      }
    }
  }
`;
