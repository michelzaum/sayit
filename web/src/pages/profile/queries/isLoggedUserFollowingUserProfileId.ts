import { gql } from "@apollo/client";

export const IS_LOGGED_USER_FOLLOWING_USER_PROFILE_ID = gql`
  query Query($userProfileId: String) {
    isLoggedUserFollowingUserProfileId(userProfileId: $userProfileId)
  }
`;
