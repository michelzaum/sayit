import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "./container";

import { typeDefs, resolvers } from "../index";

const server = new ApolloServer({
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
