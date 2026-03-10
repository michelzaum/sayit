import { IContainer } from "@/main/model";
import { SignInMutationArgs } from "./sign-in.model";

export const signInMutation = {
  signIn: async (_, { body }: SignInMutationArgs, context: IContainer) => {
    const accessToken = await context.signInUseCase.execute(body);

    context.http.res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Strict`,
    );

    return { success: true };
  },
};
