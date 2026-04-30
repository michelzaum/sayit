import { User } from "@/modules/user/entities/User";
import { Post } from "../../entities/Post";
import { IPostRepository } from "../IPostRepository";

export class InMemoryPostRepository implements IPostRepository {
  public postList: (
    Post & {
      id: string;
      authorId: string
    })[] = [];

  async create(post: Post, authorId: string): Promise<Post & Partial<User>> {
    const newPost = {
      ...post,
      id: String(this.postList.length + 1),
      authorId,
    };
    this.postList.push(newPost);
    return newPost;
  }

  async getAll(): Promise<Post[]> {
    return this.postList;
  }

  async delete(postId: string): Promise<void> {
    const index = this.postList.findIndex((post) => post.id === postId);
    if (index !== -1) {
      this.postList.splice(index, 1);
    }
  }

  async update(postId: string, newContent: string): Promise<Post> {
    const post = this.postList.find((post) => post.id === postId);
    if (!post) throw new Error("Post not found");

    post.content = newContent;
    return post;
  }

  async getById(postId: string): Promise<Post & Partial<User>> {
    const post = this.postList.find((post) => post.id === postId);
    if (!post) throw new Error("Post not found");

    return post;
  }
}