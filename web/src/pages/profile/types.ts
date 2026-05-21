export type UserInfo = {
  name: string;
  createdAt: string;
}

export type UserProfileInfo = {
  getUserProfileInfo: {
    canEdit: boolean;
    userInfo: UserInfo;
  };
}
