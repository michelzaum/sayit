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
}
