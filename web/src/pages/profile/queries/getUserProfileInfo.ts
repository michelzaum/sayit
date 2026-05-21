import { gql } from "@apollo/client";

export const GET_USER_PROFILE_INFO = gql`
  query GetUserProfileInfo($userId: String) {
    getUserProfileInfo(id: $userId) {
      canEdit
      userInfo {
        name
        createdAt
      }
    }
  }
`;