import { Post } from "../entities/Post";

export interface IPostRepository {
  create(post: Post, authorId: string): Promise<Post>;
}
