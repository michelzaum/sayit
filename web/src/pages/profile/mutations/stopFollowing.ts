import { gql } from "@apollo/client";

export const STOP_FOLLOWING = gql`
  mutation Mutation($userFollowedId: String) {
    stopFollowing(userFollowedId: $userFollowedId)
  }
`;
