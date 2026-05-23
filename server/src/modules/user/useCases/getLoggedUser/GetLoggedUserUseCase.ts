import { IUserRepository } from "../../repositories/IUserRepository";

export class GetLoggedUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(userId: string) {
    return this.userRepository.getById(userId);
  }
}
