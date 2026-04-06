import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { ILikeRepository } from "../repositories/ILikeRepository";
import { env } from "@/config/env";

export class DeleteLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async execute(postId: string, request: IncomingMessage) {
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

    return this.likeRepository.delete(authorId, postId);
  }
}
