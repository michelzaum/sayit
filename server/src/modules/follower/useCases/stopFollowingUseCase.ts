import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class StopFollowingUseCase {
  constructor(private readonly followeRepository: IFollowerRepository) {}

  async execute(userFollowedId: string, followedByUserId: string) {
    return this.followeRepository.stopFollow(userFollowedId, followedByUserId);
  }
}
