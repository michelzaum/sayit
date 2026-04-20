import { hash } from "bcryptjs";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: User): Promise<User> {
    const { email: existingUserEmail } = await this.userRepository.getByEmail(data.email);

    if (existingUserEmail) {
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
