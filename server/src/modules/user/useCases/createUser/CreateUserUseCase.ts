import { hash } from "bcryptjs";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateuserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: User): Promise<User> {
    const { password } = data;

    const encryptedPassword = await hash(password, 8);

    return await this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });
  }
}
