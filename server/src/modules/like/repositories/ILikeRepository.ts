import { Like } from "../entities/Like";

export interface ILikeRepository {
  create(authorId: string, postId: string): Promise<Like>;
}
