import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { IUserRepository } from "../../repositories/IUserRepository";
import { env } from "@/config/env";

export class GetLoggedUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(request: IncomingMessage) {
    const cookie = request.headers.cookie;

    if (!cookie) {
      throw new Error("No cookies found");
    }

    if (!cookie.includes("accessToken")) {
      throw new Error("access token not found");
    }

    const [_, accessToken] = cookie.split("=");

    const { sub: userId } = jwt.verify(
      accessToken,
      env.jwtSecret,
    ) as jwt.JwtPayload;

    if (!userId) {
      throw new Error("Invalid access token. No 'sub' value found.");
    }

    return this.userRepository.getById(userId);
  }
}
