import { CommentRepository } from "../../repositories/CommentRepository";

export class GetAllCommentsByPostIdUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(postId: string) {
    return this.commentRepository.getAllByPostId(postId);
  }
}
