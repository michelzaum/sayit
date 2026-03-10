import { IncomingMessage, ServerResponse } from "http";

import { UserRepository } from "../modules/user/repositories/UserRepository";
import { CreateuserUseCase } from "../modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "../modules/user/useCases/getUser/GetUserUseCase";
import { SignInUseCase } from "../modules/auth/sign-in/useCases/SignInUseCase";

import { IContainer } from "./model";
import { PostRepository } from "@/modules/post/repositories/PostRepository";
import { CreatePostUseCase } from "@/modules/post/useCases/createPost/CreatePostUseCase";

const userRepository = new UserRepository();
const postRepository = new PostRepository();

export const container: IContainer = {
  http: {
    req: {} as IncomingMessage,
    res: {} as ServerResponse<IncomingMessage>,
  },
  createUserUseCase: new CreateuserUseCase(userRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
  signInUseCase: new SignInUseCase(userRepository),
  createPostUseCase: new CreatePostUseCase(postRepository),
};
