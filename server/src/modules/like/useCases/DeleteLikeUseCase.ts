import { ILikeRepository } from "../repositories/ILikeRepository";

export class DeleteLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) { }

  async execute(postId: string, authorId: string) {
    return this.likeRepository.delete(authorId, postId);
  }
}
