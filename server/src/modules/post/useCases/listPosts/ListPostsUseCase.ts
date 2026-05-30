import { IPostRepository } from "../../repositories/IPostRepository";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";

interface ListPostsRequest {
  loggedUserId: string;
}

export class ListPostsUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
  ) { }

  async execute({ loggedUserId }: ListPostsRequest) {
    const loggedUser = await this.userRepository.getById(loggedUserId);
    const posts = await this.postRepository.getAll();

    return {
      loggedUser,
      posts,
    };
  }
}
