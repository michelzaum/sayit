import { User } from "@/modules/user/entities/User";
import { Comment } from "../entities/Comment";

export interface ICommentRepository {
  create(
    authorId: string,
    postId: string,
    content: string,
  ): Promise<Partial<Comment> & { authorName: string }>;
}
