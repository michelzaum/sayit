import { ICommentRepository } from "../../repositories/ICommentRepository";

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async execute(authorId: string, postId: string, content: string) {
    return this.commentRepository.create(authorId, postId, content);
  }
}
