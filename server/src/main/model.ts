import { IncomingMessage, ServerResponse } from "http";

import { SignInUseCase } from "@/modules/auth/sign-in/useCases/SignInUseCase";
import { CreateUserUseCase } from "@/modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/modules/user/useCases/getUser/GetUserUseCase";

import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";
import { ListPostsUseCase } from "@/modules/post/useCases/listPosts/ListPostsUseCase";
import { DeletePostUseCase } from "@/modules/post/useCases/deletePost/DeletePostUseCase";
import { UpdatePostUseCase } from "@/modules/post/useCases/updatePost/UpdatePostUseCase";
import { GetPostUseCase } from "@/modules/post/useCases/getPost/GetPostUseCase";

import { CreateCommentUseCase } from "@/modules/comments/useCases/createComment/CreateCommentUseCase";
import { UpdateCommentUseCase } from "@/modules/comments/useCases/updateComment/UpdateCommentUseCase";
import { DeleteCommentUseCase } from "@/modules/comments/useCases/deleteComment/DeleteCommentUseCase";

import { CreateLikeUseCase } from "@/modules/like/useCases/CreateLikeUseCase";

interface IHttp {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}

export interface IContainer {
  http: IHttp;
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  signInUseCase: SignInUseCase;
  createPostUseCase: CreatePostUseCase;
  listPostsUseCase: ListPostsUseCase;
  deletePostUseCase: DeletePostUseCase;
  updatePostUseCase: UpdatePostUseCase;
  getPostUseCase: GetPostUseCase;
  createCommentUseCase: CreateCommentUseCase;
  updateCommentUseCase: UpdateCommentUseCase;
  deleteCommentUseCase: DeleteCommentUseCase;
  createLikeUseCase: CreateLikeUseCase;
}
