import { Comment } from "../entities/Comment";

export interface IComment {
  create(authorId: string, postId: string, content: string): Comment;
}
