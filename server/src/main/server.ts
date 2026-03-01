import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "./container";

interface IApolloServerContext {
  // TODO: revisit this to not return any
  createUserUseCase: any;
  getUserUseCase: any;
}

import { typeDefs, resolvers } from "../index";

const server = new ApolloServer<IApolloServerContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
  context: async () => ({
    createUserUseCase: container.createUserUseCase,
    getUserUseCase: container.getUserUseCase,
  }),
});

console.log(`Server ready at: ${url}`);
