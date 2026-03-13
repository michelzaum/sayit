import { IPostRepository } from "../../repositories/IPostRepository";

export class ListPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute() {
    return await this.postRepository.getAll();
  }
}
