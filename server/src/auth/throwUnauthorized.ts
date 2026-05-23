import { GraphQLError } from "graphql/error";

export function throwUnauthorized(): never {
  throw new GraphQLError("User is not authenticated", {
    extensions: {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    },
  });
}
