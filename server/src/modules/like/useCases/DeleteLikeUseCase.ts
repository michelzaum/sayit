import { ILikeRepository } from "../repositories/ILikeRepository";

export class DeleteLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async execute(authorId: string, postId: string) {
    return this.likeRepository.delete(authorId, postId);
  }
}
