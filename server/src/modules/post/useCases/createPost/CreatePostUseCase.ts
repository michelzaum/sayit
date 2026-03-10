import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepository";
import { env } from "@/config/env";

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(post: Post, request: IncomingMessage): Promise<Post> {
    const cookie = request.headers.cookie;

    if (!cookie) {
      throw new Error("No cookies found");
    }

    if (!cookie.includes("accessToken")) {
      throw new Error("access token not found");
    }

    const [_, accessToken] = cookie.split("=");

    const { sub: authorId } = jwt.verify(
      accessToken,
      env.jwtSecret,
    ) as jwt.JwtPayload;

    if (!authorId) {
      throw new Error("Invalid access token. No 'sub' value found.");
    }

    return this.postRepository.create(post, authorId);
  }
}
