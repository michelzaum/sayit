import { Follower } from "../entities/Follower";

type GetUserRelationsResponse = {
  following: {
    userFollowedId: string;
  };
  followers: {
    followedByUserId: string;
  };
};

export interface IFollowerRepository {
  startFollow(
    userFollowedId: string,
    followedByUserId: string,
  ): Promise<Partial<Follower>>;
  stopFollow(userFollowedId: string, followedByUserId: string): Promise<void>;
  checkLoggedUserFollowUserProfileId(
    userProfileId: string,
    loggedUserId: string,
  ): Promise<Partial<Follower>>;
  getUserRelations(userId: string): Promise<GetUserRelationsResponse>;
}
