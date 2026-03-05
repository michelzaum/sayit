interface SignInArgs {
  body: {
    email: string;
    password: string;
  };
}

export const signInMutation = {
  signIn: async (_, { body }: SignInArgs, { signInUseCase }) => {
    const accessToken = await signInUseCase.execute(body);
    return { accessToken };
  },
};
