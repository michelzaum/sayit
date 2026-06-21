import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class IsLoggedUserFollowingUserProfileIdUseCase {
  constructor(private readonly followerRepository: IFollowerRepository) {}

  async execute(userProfileId: string, loggedUserId: string) {
    if (userProfileId === loggedUserId) {
      throw new Error("Use can't follow itself");
    }

    const result =
      await this.followerRepository.checkLoggedUserFollowUserProfileId(
        userProfileId,
        loggedUserId,
      );

    if (!result) {
      return false;
    }

    return true;
  }
}
