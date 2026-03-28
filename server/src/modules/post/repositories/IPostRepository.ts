import { User } from "@/modules/user/entities/User";
import { Post } from "../entities/Post";

export interface IPostRepository {
  create(post: Post, authorId: string): Promise<Post & Partial<User>>;
  getAll(): Promise<Post[]>;
  delete(postId: string): Promise<void>;
  update(postId: string, newContent: string): Promise<Post>;
  getById(postId: string): Promise<Post & Partial<User>>;
}
