import { ICommentRepository } from "../../repositories/ICommentRepository";

export class UpdateCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async execute(commentId: string, newContent: string) {
    return this.commentRepository.update(commentId, newContent);
  }
}
