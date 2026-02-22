import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router";
import "./index.css";
import { client } from "./graphql/client.ts";
import { RoutesComponent } from "./routes.tsx";
import { Header } from "./components/header/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <RoutesComponent />
    </BrowserRouter>
  </ApolloProvider>,
);
