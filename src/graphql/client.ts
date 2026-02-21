import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://flyby-router-demo.herokuapp.com/" }),
  cache: new InMemoryCache(),
});
