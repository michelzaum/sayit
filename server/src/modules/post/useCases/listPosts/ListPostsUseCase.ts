import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { IPostRepository } from "../../repositories/IPostRepository";
import { env } from "@/config/env";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";

export class ListPostsUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: IncomingMessage) {
    const cookie = request.headers.cookie;

    if (!cookie) {
      throw new Error("No cookies found");
    }

    if (!cookie.includes("accessToken")) {
      throw new Error("access token not found");
    }

    const [_, accessToken] = cookie.split("=");

    const { sub: loggedUserId } = jwt.verify(
      accessToken,
      env.jwtSecret,
    ) as jwt.JwtPayload;

    if (!loggedUserId) {
      throw new Error("Invalid access token. No 'sub' value found.");
    }

    const loggedUser = await this.userRepository.getById(loggedUserId);
    const posts = await this.postRepository.getAll();

    return {
      loggedUser,
      posts,
    };
  }
}
