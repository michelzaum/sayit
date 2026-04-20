import { hash } from "bcryptjs";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: Omit<User, 'id'>): Promise<User> {
    const isEmailAlreadyInUse = await this.userRepository.getByEmail(data.email);

    if (isEmailAlreadyInUse) {
      throw new Error("E-mail já cadastrado");
    }

    const { password } = data;

    const encryptedPassword = await hash(password, 8);

    return await this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });
  }
}
