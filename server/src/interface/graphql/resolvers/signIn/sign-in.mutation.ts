import { SignInMutationArgs } from "./sign-in.model";

export const signInMutation = {
  signIn: async (_, { body }: SignInMutationArgs, { signInUseCase }) => {
    const accessToken = await signInUseCase.execute(body);
    return { accessToken };
  },
};
