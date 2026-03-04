import { UserRepository } from "../modules/user/repositories/UserRepository";
import { CreateuserUseCase } from "../modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "../modules/user/useCases/getUser/GetUserUseCase";
import { GetUserByEmailUseCase } from "../modules/user/useCases/getUserByEmail/GetUserByEmailUseCase";
import { SignInUseCase } from "../modules/auth/sign-in/useCases/SignInUseCase";

import { IContainer } from "./model";

const userRepository = new UserRepository();

export const container: IContainer = {
  createUserUseCase: new CreateuserUseCase(userRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
  getUserByEmailUseCase: new GetUserByEmailUseCase(userRepository),
  signInUseCase: new SignInUseCase(userRepository),
};
