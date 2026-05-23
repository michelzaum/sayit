import { ICommentRepository } from "../../repositories/ICommentRepository";

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) { }

  async execute(postId: string, content: string, authorId: string) {
    return this.commentRepository.create(authorId, postId, content);
  }
}
