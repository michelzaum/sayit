import { OperationTypeNode } from "graphql";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/",
  }),
);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
