import { hash } from "bcryptjs";

import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(id: string, body: IUpdateUserDTO, authenticatedUserId: string) {
    if (id !== authenticatedUserId) {
      throw new Error('Unauthorized');
    }

    const { password } = body;

    body.password = password
      ? await hash(password, 8)
      : undefined;

    return this.userRepository.update(id, body);
  }
}
