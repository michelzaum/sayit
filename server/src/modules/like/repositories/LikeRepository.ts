import { prismaClient } from "@/database/prisma/client";
import { Like } from "../entities/Like";
import { ILikeRepository } from "./ILikeRepository";

export class LikeRepository implements ILikeRepository {
  async create(authorId: string, postId: string): Promise<Like> {
    return await prismaClient.like.create({
      data: {
        authorId,
        postId,
      },
    });
  }
}
