import { ILikeRepository } from "../repositories/ILikeRepository";

export class PostLikesByAuthorIdUseCase {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async execute(authorId: string) {
    return await this.likeRepository.getPostLikesByAuthorId(authorId);
  }
}
