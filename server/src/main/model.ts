import { IncomingMessage, ServerResponse } from "http";

import { SignInUseCase } from "@/modules/auth/sign-in/useCases/SignInUseCase";
import { CreateuserUseCase } from "@/modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/modules/user/useCases/getUser/GetUserUseCase";
import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";
import { ListPostsUseCase } from "@/modules/post/useCases/listPosts/ListPostsUseCase";
import { DeletePostUseCase } from "@/modules/post/useCases/deletePost/DeletePostUseCase";

interface IHttp {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}

export interface IContainer {
  http: IHttp;
  createUserUseCase: CreateuserUseCase;
  getUserUseCase: GetUserUseCase;
  signInUseCase: SignInUseCase;
  createPostUseCase: CreatePostUseCase;
  listPostsUseCase: ListPostsUseCase;
  deletePostUseCase: DeletePostUseCase;
}
