import { SignInUseCase } from "@/modules/auth/sign-in/useCases/SignInUseCase";
import { CreateuserUseCase } from "@/modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/modules/user/useCases/getUser/GetUserUseCase";

export interface IContainer {
  createUserUseCase: CreateuserUseCase;
  getUserUseCase: GetUserUseCase;
  signInUseCase: SignInUseCase;
}
