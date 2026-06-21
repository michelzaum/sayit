import { prismaClient } from "@/database/prisma/client";

import { Follower } from "../entities/Follower";
import { IFollowerRepository } from "./IFollowerRepository";
import { log } from "node:console";

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
    await prismaClient.follower.delete({
      where: {
        userFollowedId_followedByUserId: {
          followedByUserId,
          userFollowedId,
        },
      },
    });
  }

  async checkLoggedUserFollowUserProfileId(
    userProfileId: string,
    loggedUserId: string,
  ): Promise<Partial<Follower>> {
    return await prismaClient.follower.findUnique({
      where: {
        userFollowedId_followedByUserId: {
          userFollowedId: userProfileId,
          followedByUserId: loggedUserId,
        },
      },
      select: {
        followedByUserId: true,
        userFollowedId: true,
      },
    });
  }
}
