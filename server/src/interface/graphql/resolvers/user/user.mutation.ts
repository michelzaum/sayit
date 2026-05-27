import { IContainer } from "@/main/model";

interface CreateUserArgs {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

interface UpdateUserArgs {
  id: string;
  body: {
    name: string;
    bio: string;
    password: string;
  }
}

export const userMutation = {
  createUser: async (_, args: CreateUserArgs, { createUserUseCase }: IContainer) => {
    return await createUserUseCase.execute(args.body);
  },
  updateUser: async (_, args: UpdateUserArgs, { updateUserUseCase }: IContainer) => {
    const { id, body } = args;
    return updateUserUseCase.execute(id, body);
  },
};
