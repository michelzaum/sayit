import { ILikeRepository } from "../repositories/ILikeRepository";

export class CreateLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async execute(authorId: string, postId: string) {
    return this.likeRepository.create(authorId, postId);
  }
}
