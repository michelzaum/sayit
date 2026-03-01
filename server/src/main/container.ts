import { UserRepository } from "../modules/user/repositories/UserRepository";
import { CreateuserUseCase } from "../modules/user/useCases/createUser/CreateUserUseCase";
import { GetUserUseCase } from "../modules/user/useCases/getUser/GetUserUseCase";

const userRepository = new UserRepository();

export const container = {
  createUserUseCase: new CreateuserUseCase(userRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
};
