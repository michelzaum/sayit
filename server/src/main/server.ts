import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

import { typeDefs } from "../interface/graphql/schema";
import { resolvers } from "../interface/graphql/resolvers";
import { container } from "./container";
import { IContainer } from "./model";

const server = new ApolloServer<IContainer>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
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
        listPostsUseCase: container.listPostsUseCase,
      };
    },
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);

console.log("Server ready at http://localhost:4000/graphql");
