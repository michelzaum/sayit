import { Follower } from "../entities/Follower";

export interface IFollowerRepository {
  startFollow(
    userFollowedId: string,
    followedByUserId: string,
  ): Promise<Follower>;
  stopFollow(userFollowedId: string, followedByUserId: string): Promise<void>;
}
