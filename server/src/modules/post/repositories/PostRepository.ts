import { prismaClient } from "@/database/prisma/client";
import { IPostRepository } from "./IPostRepository";
import { Post } from "../entities/Post";
import { PostCard } from "../entities/PostCard";

export class PostRepository implements IPostRepository {
  async create(post: Partial<Post>, authorId: string): Promise<Post> {
    return await prismaClient.post.create({
      data: {
        content: post.content,
        authorId,
      },
    });
  }

  async getAll(): Promise<PostCard[]> {
    return prismaClient.post.findMany({
      select: {
        content: true,
        createdAt: true,
        author: true,
        comments: true,
        likes: true,
      },
    });
  }
}
