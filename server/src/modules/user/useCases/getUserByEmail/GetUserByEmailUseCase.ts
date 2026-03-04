import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    return await this.userRepository.getByEmail(email);
  }
}
