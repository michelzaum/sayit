import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateuserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: User) {
    return await this.userRepository.create(data);
  }
}
