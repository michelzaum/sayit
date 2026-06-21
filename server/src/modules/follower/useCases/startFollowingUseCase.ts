import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class StartFollowingUseCase {
  constructor(private readonly followerRepository: IFollowerRepository) {}

  async execute(userFollowedId: string, followedByUserId: string) {
    if (userFollowedId === followedByUserId) {
      throw new Error("User can't follow itself");
    }

    return this.followerRepository.startFollow(
      userFollowedId,
      followedByUserId,
    );
  }
}
