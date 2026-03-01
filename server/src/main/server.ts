import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container } from "./container";
import { typeDefs, resolvers } from "../index";
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
  }),
});

console.log(`Server ready at: ${url}`);
