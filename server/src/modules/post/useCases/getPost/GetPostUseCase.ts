import { IPostRepository } from "../../repositories/IPostRepository";

export class GetPostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postId: string) {
    return this.postRepository.getById(postId);
  }
}
