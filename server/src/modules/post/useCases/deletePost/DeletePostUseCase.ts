import { IPostRepository } from "../../repositories/IPostRepository";

export class DeletePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postId: string) {
    return this.postRepository.delete(postId);
  }
}
