import { hash } from "bcryptjs";

import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(id: string, body: IUpdateUserDTO) {
    const { password } = body;

    let encryptedPassword = '';
    if (password) {
      encryptedPassword = await hash(password, 8);
    }

    return this.userRepository.update(id, { ...body, password: encryptedPassword });
  }
}
