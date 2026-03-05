interface CreateUserArgs {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export const userMutation = {
  createUser: async (_, args: CreateUserArgs, { createUserUseCase }) => {
    return await createUserUseCase.execute(args.body);
  },
};
