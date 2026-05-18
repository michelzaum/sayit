export type LoggedUser = {
  getLoggedUser: {
    name: string;
    createdAt: string;
  }
}

export type UserInfo = {
  name: string;
  userCreatedAtMonth: string;
  userCreatedAtYear: number;
}