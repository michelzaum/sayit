import { prismaClient } from "@/database/prisma/client";
import { User } from "@/modules/user/entities/User";

import { Comment } from "../entities/Comment";
import { ICommentRepository } from "./ICommentRepository";

export class CommentRepository implements ICommentRepository {
  async create(
    authorId: string,
    postId: string,
    content: string,
  ): Promise<Partial<Comment> & Pick<User, "name">> {
    const newComment = await prismaClient.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const { author, ...comment } = newComment;

    return {
      ...comment,
      name: author.name,
    };
  }
}
