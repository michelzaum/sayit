import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class StartFollowingUseCase {
  constructor(private readonly followerRepository: IFollowerRepository) {}

  async execute(userFollowedId: string, followedByUserId: string) {
    return this.followerRepository.startFollow(
      userFollowedId,
      followedByUserId,
    );
  }
}
