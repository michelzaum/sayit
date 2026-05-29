export type UserProfileInfo = {
  userInfo: {
    bio: string;
    name: string;
    createdAt: string;
  };
  canEdit: boolean;
}

export type GetUserProfileInfo = {
  getUserProfileInfo: UserProfileInfo;
}
