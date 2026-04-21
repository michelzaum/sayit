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

    if (password.length < 8 || password.length > 16) {
      throw new Error("Senha invalida. Minimo 8 caracteres e maximo 16");
    }

    const encryptedPassword = await hash(password, 8);

    return await this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });
  }
}
