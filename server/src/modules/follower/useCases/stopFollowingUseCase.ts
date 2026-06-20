import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class StopFollowingUseCase {
  constructor(private readonly followeRepository: IFollowerRepository) {}

  async execute(userFollowedId: string, followedByUserId: string) {
    if (userFollowedId === followedByUserId) {
      throw new Error("User can't unfollow itself");
    }

    return this.followeRepository.stopFollow(userFollowedId, followedByUserId);
  }
}
