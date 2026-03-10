import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepository";

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: Post, authorId: string) {
    return this.postRepository.create(post, authorId);
  }
}
