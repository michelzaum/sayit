import { Like } from "../entities/Like";

export interface ILikeRepository {
  create(authorId: string, postId: string): Promise<Like>;
  delete(authorId: string, postId: string): Promise<void>;
}
