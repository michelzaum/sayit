import { IContainer } from "@/main/model";
import { SignInMutationArgs } from "./sign-in.model";

export const signInMutation = {
  signIn: async (_, { body }: SignInMutationArgs, context: IContainer) => {
    const accessToken = await context.signInUseCase.execute(body);

    const isProduction = process.env.NODE_ENV === "production";

    context.http.res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; ${
        isProduction ? "SameSite=None; Secure;" : "SameSite=Lax;"
      }`,
    );

    return { success: true };
  },
};
