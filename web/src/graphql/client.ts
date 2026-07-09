import { OperationTypeNode } from "graphql";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const httpLink = new HttpLink({
  uri: "https://sayit-production-4398.up.railway.app/graphql",
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://sayit-production-4398.up.railway.app/graphql",
    webSocketImpl: WebSocket,
  }),
);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  httpLink,
);

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        window.location.href = "/sign-in";
      }
    });
  } else if (ServerError.is(error)) {
    console.log(
      `[Network error]: Status: ${error.statusCode}, Message: ${error.message}`,
    );
  } else {
    console.log(`[Network error]: ${error}`);
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
