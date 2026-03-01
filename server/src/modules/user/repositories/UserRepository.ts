import { IUserRepository } from "./IUserRepository";
import { prismaClient } from "../../../database/prisma/client";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    return await prismaClient.user.create({
      data,
    });
  }

  async getById(id: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }
}
