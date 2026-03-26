import { IPostRepository } from "../../repositories/IPostRepository";

export class UpdatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postId: string, newContent: string) {
    return this.postRepository.update(postId, newContent);
  }
}
