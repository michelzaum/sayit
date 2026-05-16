import { IContainer } from "@/main/model";

export const signOutMutation = {
  signOut: async (_, __, context: IContainer) => {
    const isProduction = process.env.NODE_ENV === "production";

    context.http.res.setHeader(
      "Set-Cookie",
      `accessToken=''; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00; ${isProduction ? "SameSite=None; Secure;" : "SameSite=Lax;"
      }`,
    );

    return { success: true };
  },
};
