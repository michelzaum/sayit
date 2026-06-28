import { gql } from "@apollo/client";

export const GET_USER_RELATIONS = gql`
  query Query($userId: String) {
    getUserRelations(userId: $userId) {
      followers {
        followedByUserId
      }
      following {
        userFollowedId
      }
    }
  }
`;
