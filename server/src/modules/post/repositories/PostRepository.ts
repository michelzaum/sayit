import { prismaClient } from "@/database/prisma/client";
import { IPostRepository } from "./IPostRepository";
import { Post } from "../entities/Post";
import { PostCard } from "../entities/PostCard";
import { User } from "@/modules/user/entities/User";

export class PostRepository implements IPostRepository {
  async create(
    post: Partial<Post>,
    authorId: string,
  ): Promise<Post & Partial<User>> {
    return await prismaClient.post.create({
      data: {
        content: post.content,
        authorId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        likes: true,
        comments: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getById(postId: string): Promise<Post> {
    return prismaClient.post.findUnique({
      where: { id: postId },
    });
  }

  async getAll(): Promise<PostCard[]> {
    return prismaClient.post.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: true,
        comments: true,
        likes: true,
      },
    });
  }

  async delete(postId: string): Promise<void> {
    await prismaClient.post.delete({
      where: { id: postId },
    });
  }

  async update(postId: string, newContent: string): Promise<Post> {
    return prismaClient.post.update({
      where: { id: postId },
      data: {
        content: newContent,
      },
    });
  }
}
