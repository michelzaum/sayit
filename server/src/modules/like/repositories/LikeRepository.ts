import { prismaClient } from "@/database/prisma/client";
import { Like } from "../entities/Like";
import { ILikeRepository } from "./ILikeRepository";

export class LikeRepository implements ILikeRepository {
  getPostLikeByAuthorId(authorId: string): Promise<Like[]> {
    throw new Error("Method not implemented.");
  }
  async create(authorId: string, postId: string): Promise<Like> {
    return await prismaClient.like.create({
      data: {
        authorId,
        postId,
      },
      select: {
        authorId: true,
        postId: true,
      },
    });
  }

  async delete(authorId: string, postId: string): Promise<void> {
    await prismaClient.like.delete({
      where: {
        authorId_postId: { authorId, postId },
      },
    });
  }

  async getPostLikesByAuthorId(authorId: string): Promise<Like[]> {
    return await prismaClient.like.findMany({
      where: { authorId },
      select: {
        authorId: true,
        postId: true,
      },
    });
  }
}
