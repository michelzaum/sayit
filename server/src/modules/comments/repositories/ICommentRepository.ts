import { Comment } from "../entities/Comment";

export interface ICommentRepository {
  create(
    authorId: string,
    postId: string,
    content: string,
  ): Promise<Comment>;
  update(
    commentId: string,
    newContent: string,
  ): Promise<Comment>;
  delete(commentId: string): Promise<void>;
  getAllByPostId(postId: string): Promise<Comment[]>;
}
