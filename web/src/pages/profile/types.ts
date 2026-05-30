import { PostCard } from "@/entities/PostCard";

export type UserProfileInfo = {
  userInfo: {
    bio: string;
    name: string;
    createdAt: string;
  };
  canEdit: boolean;
}

export type GetUserProfileInfo = {
  getUserProfileInfo: UserProfileInfo;
}

export type GetAllPostsByAuthorId = {
  getAllPostsByAuthorId: PostCard[];
}
