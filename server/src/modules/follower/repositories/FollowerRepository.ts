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

  async getUserRelations(userId: string): Promise<any> {
    const following = await prismaClient.follower.findMany({
      where: { followedByUserId: userId },
      select: { userFollowedId: true },
    });

    const followers = await prismaClient.follower.findMany({
      where: { userFollowedId: userId },
      select: { followedByUserId: true },
    });

    return {
      following,
      followers,
    };
  }
}
