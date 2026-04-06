import { IncomingMessage, ServerResponse } from "http";

import { UserRepository } from "../modules/user/repositories/UserRepository";

import { CreateUserUseCase } from "../modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "../modules/user/useCases/getUser/GetUserUseCase";
import { SignInUseCase } from "../modules/auth/sign-in/useCases/SignInUseCase";

import { PostRepository } from "@/modules/post/repositories/PostRepository";
import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";
import { ListPostsUseCase } from "@/modules/post/useCases/listPosts/ListPostsUseCase";
import { DeletePostUseCase } from "@/modules/post/useCases/deletePost/DeletePostUseCase";
import { UpdatePostUseCase } from "@/modules/post/useCases/updatePost/UpdatePostUseCase";
import { GetPostUseCase } from "@/modules/post/useCases/getPost/GetPostUseCase";

import { CommentRepository } from "@/modules/comments/repositories/CommentRepository";
import { CreateCommentUseCase } from "@/modules/comments/useCases/createComment/CreateCommentUseCase";
import { UpdateCommentUseCase } from "@/modules/comments/useCases/updateComment/UpdateCommentUseCase";

import { IContainer } from "./model";
import { DeleteCommentUseCase } from "@/modules/comments/useCases/deleteComment/DeleteCommentUseCase";
import { CreateLikeUseCase } from "@/modules/like/useCases/CreateLikeUseCase";
import { DeleteLikeUseCase } from "@/modules/like/useCases/DeleteLikeUseCase";
import { LikeRepository } from "@/modules/like/repositories/LikeRepository";
import { PostLikesByAuthorIdUseCase } from "@/modules/like/useCases/PostLikesByAuthorIdUseCase";

const userRepository = new UserRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();
const likeRepository = new LikeRepository();

export const container: IContainer = {
  http: {
    req: {} as IncomingMessage,
    res: {} as ServerResponse<IncomingMessage>,
  },
  createUserUseCase: new CreateUserUseCase(userRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
  signInUseCase: new SignInUseCase(userRepository),
  createPostUseCase: new CreatePostUseCase(postRepository),
  listPostsUseCase: new ListPostsUseCase(postRepository, userRepository),
  deletePostUseCase: new DeletePostUseCase(postRepository),
  updatePostUseCase: new UpdatePostUseCase(postRepository),
  getPostUseCase: new GetPostUseCase(postRepository),
  createCommentUseCase: new CreateCommentUseCase(commentRepository),
  updateCommentUseCase: new UpdateCommentUseCase(commentRepository),
  deleteCommentUseCase: new DeleteCommentUseCase(commentRepository),
  createLikeUseCase: new CreateLikeUseCase(likeRepository),
  deleteLikeUseCase: new DeleteLikeUseCase(likeRepository),
  getPostLikesByAuthorIdUseCase: new PostLikesByAuthorIdUseCase(likeRepository),
};
