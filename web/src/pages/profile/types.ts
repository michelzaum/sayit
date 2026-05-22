export type UserProfileInfo = {
  userInfo: {
    name: string;
    createdAt: string;
  };
  canEdit: boolean;
}

export type GetUserProfileInfo = {
  getUserProfileInfo: UserProfileInfo;
}
