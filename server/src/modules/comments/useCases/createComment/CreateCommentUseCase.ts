import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { ICommentRepository } from "../../repositories/ICommentRepository";

export class CreateCommentUseCase {
  constructor(private readonly commentRepository: ICommentRepository) {}

  async execute(postId: string, content: string, request: IncomingMessage) {
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

    return this.commentRepository.create(authorId, postId, content);
  }
}
