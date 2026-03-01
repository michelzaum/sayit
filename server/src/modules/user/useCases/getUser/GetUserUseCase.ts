import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    return this.userRepository.getById(id);
  }
}
