import { hash } from "bcryptjs";
import { z } from 'zod';

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

const schema = z.object({
  name: z.string().min(1, { error: 'Nome invalido' }).refine((name) => !/\d/.test(name), { error: 'Nome invalido' }),
  email: z.email({ error: 'E-mail invalido' }),
  password: z.string()
    .min(8, {
      error: 'Senha invalida. Minimo 8 caracteres e maximo 16',
    })
    .max(16, {
      error: 'Senha invalida. Minimo 8 caracteres e maximo 16',
    }),
});

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: Omit<User, 'id'>): Promise<User> {
    const isEmailAlreadyInUse = await this.userRepository.getByEmail(data.email);

    if (isEmailAlreadyInUse) {
      throw new Error("E-mail já cadastrado");
    }

    const { password } = data;

    const { error } = schema.safeParse(data);

    if (error) {
      error.issues.forEach((issue) => {
        throw new Error(issue.message);
      });
    }

    const encryptedPassword = await hash(password, 8);

    return await this.userRepository.create({
      ...data,
      password: encryptedPassword,
    });
  }
}
