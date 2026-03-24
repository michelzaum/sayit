import { IPostRepository } from "../../repositories/IPostRepository";

export class DeletePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postId: string) {
    await this.postRepository.delete(postId);

    // TODO: revisit this to think in a better approach
    return true;
  }
}
