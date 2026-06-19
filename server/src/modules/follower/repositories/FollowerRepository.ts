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

  async stopFollow(
    userFollowedId: string,
    followedByUserId: string,
  ): Promise<void> {
    await prismaClient.follower.deleteMany({
      where: {
        followedByUserId,
        userFollowedId,
      },
    });
  }
}
