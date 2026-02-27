import { IUserRepository } from "./IUserRepository";
import { prismaClient } from "../../../database/prisma/client";

export class UserRepository implements IUserRepository {
  create(data: any): Promise<any> {
    return prismaClient.user.create(data);
  }
}
