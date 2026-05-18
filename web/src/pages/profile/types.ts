export type UserInfo = {
  name: string;
  createdAt: string;
}

export type LoggedUser = {
  getLoggedUser: UserInfo;
}
