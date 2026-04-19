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

await server.start();

function getAccessToken(req: IncomingMessage) {
  const cookie = req.headers.cookie || '';

  if (!cookie) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
        status: 401,
      }
    });
  }

  const [_, accessToken] = cookie.split("=");

  if (!accessToken) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
        status: 401,
      }
    });
  }

  return accessToken;
}

app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      if (req.body.operationName !== 'SignIn' && req.body.operationName !== 'SignUp') {
        const token = getAccessToken(req);

        if (!token)
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
              status: 401,
            }
          });
      }

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
      };
    },
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);

console.log("Server ready at http://localhost:4000");
