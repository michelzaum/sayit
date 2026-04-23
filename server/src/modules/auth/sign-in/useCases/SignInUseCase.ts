import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { env } from "@/config/env";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";
import { SignInUseCaseInput } from "./model";

const schema = z.object({
  email: z.email({ error: "E-mail invalido" }),
  password: z
    .string()
    .min(8, {
      error: "Senha invalida. Minimo 8 caracteres e maximo 16",
    })
    .max(16, {
      error: "Senha invalida. Minimo 8 caracteres e maximo 16",
    }),
});

export class SignInUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: SignInUseCaseInput): Promise<string> {
    const { email, password } = input;

    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error(`User with e-mail ${email} not found`);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign({ sub: user.id }, env.jwtSecret, {
      expiresIn: "1d",
    });

    return accessToken;
  }
}
