import { prismaClient } from "@/database/prisma/client";
import { User } from "@/modules/user/entities/User";

import { Comment } from "../entities/Comment";
import { ICommentRepository } from "./ICommentRepository";

export class CommentRepository implements ICommentRepository {
  async create(
    authorId: string,
    postId: string,
    content: string,
  ): Promise<Comment> {
    return prismaClient.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }) as unknown as Promise<Comment>;
  }

  async getAllByPostId(postId: string): Promise<Comment[]> {
    return prismaClient.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }) as unknown as Promise<Comment[]>;
  }

  async update(
    commentId: string,
    newContent: string,
  ): Promise<Comment> {
    return prismaClient.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: newContent,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }) as unknown as Promise<Comment>;
  }

  async delete(commentId: string): Promise<void> {
    await prismaClient.comment.delete({
      where: { id: commentId },
    });
  }
}
