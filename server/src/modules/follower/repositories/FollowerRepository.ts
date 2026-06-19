import { prismaClient } from "@/database/prisma/client";

import { Follower } from "../entities/Follower";
import { IFollowerRepository } from "./IFollowerRepository";

export class FollowerRepository implements IFollowerRepository {
  async startFollow(
    userFollowedId: string,
    followedByUserId: string,
  ): Promise<Partial<Follower>> {
    return prismaClient.follower.create({
      data: {
        userFollowedId,
        followedByUserId,
      },
      select: {
        userFollowedId: true,
        followedByUserId: true,
      },
    });
  }

  stopFollow(userFollowedId: string, followedByUserId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
