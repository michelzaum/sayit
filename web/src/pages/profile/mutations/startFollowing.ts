import { gql } from "@apollo/client";

export const START_FOLLOWING = gql`
  mutation Mutation($userFollowedId: String) {
    startFollowing(userFollowedId: $userFollowedId) {
      followedByUserId
    }
  }
`;
