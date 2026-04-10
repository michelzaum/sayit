import { Comment } from "../entities/Comment";

export interface ICommentRepository {
  create(
    authorId: string,
    postId: string,
    content: string,
  ): Promise<Partial<Comment> & { authorName: string }>;
  update(
    commentId: string,
    newContent: string,
  ): Promise<Pick<Comment, "content">>;
  delete(commentId: string): Promise<void>;
  getAllByPostId(postId: string): Promise<Comment[]>;
}
