import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";

interface SignInUseCaseInput {
  email: string;
  password: string;
}

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

    const accessToken = jwt.sign({ sub: user.email }, env.jwtSecret, {
      expiresIn: "1d",
    });

    return accessToken;
  }
}
