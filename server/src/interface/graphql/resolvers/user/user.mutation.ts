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
  updateUser: async (_, args: UpdateUserArgs, { updateUserUseCase, authenticatedUser }: IContainer) => {
    const { id, body } = args;
    const { id: authenticatedUserId } = authenticatedUser;

    return updateUserUseCase.execute(id, body, authenticatedUserId);
  },
};
