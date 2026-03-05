import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { container } from "./container";
import { typeDefs } from "../interface/graphql/schema";
import { resolvers } from "../interface/graphql/resolvers";
import { IContainer } from "./model";

const server = new ApolloServer<IContainer>({
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
    signInUseCase: container.signInUseCase,
  }),
});

console.log(`Server ready at: ${url}`);
