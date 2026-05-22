import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { IUserRepository } from "../../repositories/IUserRepository";
import { env } from "@/config/env";

export class GetUserProfileInfoUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(request: IncomingMessage, id: string) {
    let canEdit = false;
    const cookie = request.headers.cookie;

    if (cookie && cookie.includes("accessToken")) {
      const [_, accessToken] = cookie.split("=");

      const { sub: userId } = jwt.verify(
        accessToken,
        env.jwtSecret,
      ) as jwt.JwtPayload;

      if (!userId) {
        throw new Error("Invalid access token. No 'sub' value found.");
      }

      if (userId === id) {
        canEdit = true;
      }
    }

    const userInfo = this.userRepository.getById(id);

    if (!userInfo) {
      throw new Error("User not found");
    }

    return {
      userInfo,
      canEdit,
    }
  }
}