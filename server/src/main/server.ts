import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "../interface/graphql/schema";
import { resolvers } from "../interface/graphql/resolvers";
import { container } from "./container";
import { IContainer } from "./model";

const server = new ApolloServer<IContainer>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
  context: async ({ req, res }) => {
    return {
      http: {
        req,
        res,
      },
      createUserUseCase: container.createUserUseCase,
      getUserUseCase: container.getUserUseCase,
      signInUseCase: container.signInUseCase,
      createPostUseCase: container.createPostUseCase,
    };
  },
});

console.log(`Server ready at: ${url}`);
