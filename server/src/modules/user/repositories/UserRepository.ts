import { prismaClient } from "@/database/prisma/client";

import { IUserRepository } from "./IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  async create(data: Omit<User, 'id'>): Promise<User> {
    return await prismaClient.user.create({
      data,
    });
  }

  async getById(id: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  async getByEmail(email: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  update(id: string, body: Partial<Pick<User, "name" | "bio">>): Promise<User> {
    const { name, bio } = body;

    return prismaClient.user.update({
      where: { id },
      data: { name, bio },
    });
  }
}
