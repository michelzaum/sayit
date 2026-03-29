import { IncomingMessage, ServerResponse } from "http";

import { UserRepository } from "../modules/user/repositories/UserRepository";

import { CreateuserUseCase } from "../modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "../modules/user/useCases/getUser/GetUserUseCase";
import { SignInUseCase } from "../modules/auth/sign-in/useCases/SignInUseCase";

import { PostRepository } from "@/modules/post/repositories/PostRepository";
import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";
import { ListPostsUseCase } from "@/modules/post/useCases/listPosts/ListPostsUseCase";
import { DeletePostUseCase } from "@/modules/post/useCases/deletePost/DeletePostUseCase";
import { UpdatePostUseCase } from "@/modules/post/useCases/updatePost/UpdatePostUseCase";
import { GetPostUseCase } from "@/modules/post/useCases/getPost/GetPostUseCase";

import { IContainer } from "./model";
import { CreateCommentUseCase } from "@/modules/comments/useCases/createComment/CreateCommentUseCase";
import { CommentRepository } from "@/modules/comments/repositories/CommentRepository";

const userRepository = new UserRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();

export const container: IContainer = {
  http: {
    req: {} as IncomingMessage,
    res: {} as ServerResponse<IncomingMessage>,
  },
  createUserUseCase: new CreateuserUseCase(userRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
  signInUseCase: new SignInUseCase(userRepository),
  createPostUseCase: new CreatePostUseCase(postRepository),
  listPostsUseCase: new ListPostsUseCase(postRepository),
  deletePostUseCase: new DeletePostUseCase(postRepository),
  updatePostUseCase: new UpdatePostUseCase(postRepository),
  getPostUseCase: new GetPostUseCase(postRepository),
  createCommentUseCase: new CreateCommentUseCase(commentRepository),
};
