import { ICommentRepository } from "../../repositories/ICommentRepository";

export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async execute(commentId: string) {
    return this.commentRepository.delete(commentId);
  }
}
