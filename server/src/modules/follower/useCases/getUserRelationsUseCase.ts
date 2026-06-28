import { IFollowerRepository } from "../repositories/IFollowerRepository";

export class GetUserRelationsUseCase {
  constructor(private readonly followerRepository: IFollowerRepository) {}

  async execute(userId: string) {
    return this.followerRepository.getUserRelations(userId);
  }
}
