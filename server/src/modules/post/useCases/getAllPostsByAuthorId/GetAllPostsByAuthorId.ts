import { IPostRepository } from "../../repositories/IPostRepository";

export class GetAllPostsByAuthorIdUseCase {
  constructor(private readonly postRepository: IPostRepository) { }

  async execute(authorId: string) {
    return this.postRepository.getAllByAuthorId(authorId);
  }
}
