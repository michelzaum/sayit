import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(id: string, body: IUpdateUserDTO) {
    return this.userRepository.update(id, body);
  }
}
