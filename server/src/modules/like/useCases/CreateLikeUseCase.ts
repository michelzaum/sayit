import { ILikeRepository } from "../repositories/ILikeRepository";

export class CreateLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) { }

  async execute(postId: string, authorId: string) {
    return this.likeRepository.create(authorId, postId);
  }
}
