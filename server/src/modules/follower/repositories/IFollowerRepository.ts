import { Follower } from "../entities/Follower";

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
}
