import { prismaClient } from "@/database/prisma/client";
import { Post } from "../entities/Post";
import { IPostRepository } from "./IPostRepository";

export class PostRepository implements IPostRepository {
  async create(post: Partial<Post>, authorId: string): Promise<Post> {
    return await prismaClient.post.create({
      data: {
        content: post.content,
        authorId,
      },
    });
  }
}
