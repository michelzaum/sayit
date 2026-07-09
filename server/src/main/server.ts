import http, { IncomingMessage } from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { GraphQLError } from "graphql/error";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import cors from "cors";

import { typeDefs } from "../interface/graphql/schema";
import { resolvers } from "../interface/graphql/resolvers";
import { container } from "./container";
import { IContainer } from "./model";
import { authenticate } from "@/auth/authenticate";

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<IContainer>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

app.use(
  "/",
  cors<cors.CorsRequest>(corsOptions),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const publicOperations = ["SignIn", "CreateUser", "IntrospectionQuery"];

      let authenticatedUser = null;

      if (!publicOperations.includes(req.body.operationName)) {
        authenticatedUser = authenticate(req);
      }

      return {
        http: {
          req,
          res,
        },
        authenticatedUser,
        createUserUseCase: container.createUserUseCase,
        getUserUseCase: container.getUserUseCase,
        signInUseCase: container.signInUseCase,
        createPostUseCase: container.createPostUseCase,
        listPostsUseCase: container.listPostsUseCase,
        deletePostUseCase: container.deletePostUseCase,
        updatePostUseCase: container.updatePostUseCase,
        getPostUseCase: container.getPostUseCase,
        createCommentUseCase: container.createCommentUseCase,
        updateCommentUseCase: container.updateCommentUseCase,
        deleteCommentUseCase: container.deleteCommentUseCase,
        createLikeUseCase: container.createLikeUseCase,
        deleteLikeUseCase: container.deleteLikeUseCase,
        getPostLikesByAuthorIdUseCase: container.getPostLikesByAuthorIdUseCase,
        getAllCommentsByPostIdUseCase: container.getAllCommentsByPostIdUseCase,
        getAllPostsByAuthorIdUseCase: container.getAllPostsByAuthorIdUseCase,
        getUserProfileInfoUseCase: container.getUserProfileInfoUseCase,
        updateUserUseCase: container.updateUserUseCase,
        startFollowingUseCase: container.startFollowingUseCase,
        stopFollowingUseCase: container.stopFollowingUseCase,
        isLoggedUserFollowingUserProfileIdUseCase:
          container.isLoggedUserFollowingUserProfileIdUseCase,
        getUserRelationsUseCase: container.getUserRelationsUseCase,
      };
    },
  }),
);

await server.start();

await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT || 4000 }, resolve),
);

console.log(`Server ready at http://localhost:${process.env.PORT || 4000}`);
