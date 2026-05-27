import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(id: string, body: Partial<Pick<User, 'name' | 'bio'>>) {
    return this.userRepository.update(id, body);
  }
}
